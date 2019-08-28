'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ params, request, response, view }) {
    const users = await User.query().with('File').fetch()

    return users
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password', 'mandate', 'technologies', 'description'])

    const user = await User.create(data)
    return user
  }

  async update ({ params, request, response }) {
    const post = await User.findOrFail(params.id)

    const data = request.only(['username', 'email', 'password', 'mandate', 'technologies', 'description'])

    post.merge(data)

    await post.save()

    return post
  }

}

module.exports = UserController
