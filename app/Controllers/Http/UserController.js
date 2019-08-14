'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ params, request, response, view }) {
    const users = await User.all()

    return users
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password', 'mandate', 'technologies', 'description'])

    const user = await User.create(data)
    return user
  }
}

module.exports = UserController
