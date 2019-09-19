'use strict'
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const user = await User.findByOrFail('email', email)
    token.id_user = user.id
    token.isAdmin = user.isAdmin
    return token
  }
}

module.exports = SessionController
