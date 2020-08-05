import { Request, Response } from "express";
import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if(!filters.week_day || !filters.subject || !filters.time){
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('tb_classes')
    .whereExists(function(){
      this.select('tb_class_schedule.*')
      .from('tb_class_schedule')
      .whereRaw('`tb_class_schedule`.`class_id` = `tb_classes`.`id`')
      .whereRaw('`tb_class_schedule`.`week_day` = ??', [Number(week_day)])
      .whereRaw('`tb_class_schedule`.`from` <= ??', [timeInMinutes])
      .whereRaw('`tb_class_schedule`.`to` > ??', [timeInMinutes])
    })
    .where('tb_classes.subject', '=', subject)
    .join('tb_users', 'tb_classes.user_id', '=', 'tb_users.id')
    .select(['tb_classes.*', 'tb_users.*'])

    return response.json(classes)
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx("tb_users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx("tb_classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedUsersIds[0];

      const classesSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx("tb_class_schedule").insert(classesSchedule);

      await trx.commit();

      return response.status(201).send("");
    } catch (err) {
      console.log(err)
      await trx.rollback();
      return response.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}
