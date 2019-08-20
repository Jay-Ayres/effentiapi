'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  File () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = Post
