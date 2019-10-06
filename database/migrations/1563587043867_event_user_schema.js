'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventUserSchema extends Schema {
  up () {
    this.create('event_users', (table) => {
      table.integer('event_id').unsigned()
      table.integer('user_id').unsigned()
      table.foreign('event_id').references('events.id').onDelete('cascade')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.boolean('isConfirmed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('event_users')
  }
}

module.exports = EventUserSchema
