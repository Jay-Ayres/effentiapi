'use strict'

const Event = use('App/Models/Event')

class EventController {
  async index ({ params, request, response, view }) {
    const events = await Event.all()

    return events
  }

  async store ({ request }) {
    const data = request.only(['user_id', 'name', 'description'])
    const users = request.only(['users'])

    const event = await Event.create(data)

    if (users && users.users.length > 0) {
      console.log('dentro do metodo')
      await event.users().attach(users.users)
      event.users = await event.users().fetch()
    }

    return event
  }

  async update ({ params, request }) {
    const event = await Event.findOrFail(params.id)
    const data = request.only(['user_id', 'name', 'description'])

    event.merge(data)

    await event.save()

    return event
  }

  async destroy ({ params }) {
    const event = await Event.findOrFail(params.id)

    await event.delete()
  }
}

module.exports = EventController
