'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table
        .integer('createdby_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .integer('approvedby_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table
        .enum('status', ['pendente', 'emanalise', 'aprovado', 'reprovado'])
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
