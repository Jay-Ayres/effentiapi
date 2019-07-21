'use strict'

const Event = use('App/Models/Event')

class EventController {
  async store ({ request }) {
    const data = request.only(['user_id', 'name', 'description'])
    const users = request.only(['users'])

    const event = await Event.create(data)

    console.log('logando usuarios')
    console.log(users)
    console.log('tamanho do array')
    console.log(users.users.length)


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
