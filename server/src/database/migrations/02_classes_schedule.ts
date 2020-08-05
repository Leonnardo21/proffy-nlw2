import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('tb_class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        table.integer('class_id')
        .notNullable()
        .references('id')
        .inTable('tb_classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'); 
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('tb_class_schedule');
}