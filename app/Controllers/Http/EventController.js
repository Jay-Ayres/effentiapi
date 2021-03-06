'use strict'

const Event = use('App/Models/Event')
const User = use('App/Models/User')
const EventUser = use('App/Models/EventUser')

class EventController {
  async index ({ params, request, response }) {

    const { page } = request.get()

    const events = await Event.query().with('User').with('Files').paginate(page)

    return events
  }

  async eventByUser ({ params, request, response }) {
    const dataEvent = await Event.all()
    const events = dataEvent.toJSON()
    const dataEventUsers = await EventUser.query().where('user_id', params.id).fetch()
    const eventUsers = dataEventUsers.toJSON()

    events.forEach(event => {
      const list = eventUsers.filter(item => item.event_id == event.id)
      event.isConfirmed = list[0].isConfirmed
    })
    return events
  }

  async eventAdmin ({ params, request, response }) {
    const dataEvent = await Event.query().with('users').fetch()
    const events = dataEvent.toJSON()

    events.forEach(event => {
      const usersConfirmed = []
      const usersNotConfirmed = []

      event.users.forEach(user => {
        (user.pivot.isConfirmed) ? usersConfirmed.push(user) : usersNotConfirmed.push(user)
      })
      event.usersConfirmed = usersConfirmed
      event.usersNotConfirmed = usersNotConfirmed
      delete event.users
    })
    return events
  }

  async store ({ request }) {
    const data = request.only(['user_id', 'name', 'description', 'event_date', 'event_end_date', 'url_image'])
    const users = await User.query().fetch()

    let idsusers = users.rows.map(user => user.id)
    const event = await Event.create(data)

    await event.users().attach(idsusers)

    return event
  }

  async update ({ params, request }) {
    const event = await Event.findOrFail(params.id)
    const data = request.only(['user_id', 'name', 'description', 'event_date', 'event_end_date', 'url_image'])

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
