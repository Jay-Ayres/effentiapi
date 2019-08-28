'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  Files () {
    return this.belongsTo('App/Models/File')
  }

  User () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
