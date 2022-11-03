import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('beers', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('description', 500).notNullable();
    table.string('genre', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('beers');
}
