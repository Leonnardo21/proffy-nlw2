import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('tb_connections', table => {
        table.increments('id').primary();
    
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('tb_users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'); 

        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('tb_connections');
}