'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  users () {
    return this.belongsToMany('App/Models/User')
  }

  Files () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = Event
