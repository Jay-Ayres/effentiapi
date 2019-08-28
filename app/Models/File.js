'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  // static get computed () {
  //   return ['url']
  // }

  // getUrl ({ id }) {
  //   return `${Env.get('APP_URL')}/files/${id}`
  // }

  Posts () {
    return this.hasMany('App/Models/Post')
  }

  Events () {
    return this.hasMany('App/Models/Event')
  }
}

module.exports = File
