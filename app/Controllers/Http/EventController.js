'use strict'

const Event = use('App/Models/Event')

class EventController {
  async store ({ request }) {
    const data = request.only(['user_id', 'name', 'description'])

    const event = await Event.create(data)

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
