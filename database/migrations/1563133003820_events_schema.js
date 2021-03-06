"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventsSchema extends Schema {
  up() {
    this.create("events", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("file_id")
        .unsigned()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("name", 80).notNullable();
      table.string("url_image", 300);
      table.string("description", 100).notNullable();
      table.datetime("limit_date");
      table.datetime("event_date");
      table.datetime("event_end_date");
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventsSchema;
