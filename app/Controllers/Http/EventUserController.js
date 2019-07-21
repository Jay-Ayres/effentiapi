'use strict'

//const EventUser = use('App/Models/EventUser')
const Database = use('Database')

class EventUserController {
  async update ({ params, request }) {
    const eventUser = await Database.from('event_user').where({ event_id: 17, user_id: 4 })

    const data = request.only(['isConfirmed'])

    eventUser.merge(data)

    await eventUser.save()

    return eventUser
  }
}

module.exports = EventUserController
