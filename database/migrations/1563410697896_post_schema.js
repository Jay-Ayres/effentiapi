'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL')
      table.integer('file_id').unsigned().references('id').inTable('files').onUpdate('CASCADE').onDelete('SET NULL')
      table.string('name', 80).notNullable()
      table.string('url_image', 300)
      table.string('description', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
