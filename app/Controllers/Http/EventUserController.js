'use strict'

const Database = use('Database')
const Event = use('App/Models/Event')
const EventUser = use('App/Models/EventUser')

class EventUserController {
  async update ({ params, request }) {
    const data = request.only(['event_id', 'user_id', 'isConfirmed'])
    const event = await EventUser.findBy('event_id', data.event_id, 'user_id', data.user_id)
    data.created_at = event.created_at
    data.updated_at = event.updated_at
   
    event.merge(data)

    await event.save()

    return event
  }

  async geteventuserconfirmerd ({ params, request }) {
    const eventUsers = await Database.select('event_id').from('event_user').where('isConfirmed', '=', '1').where('user_id', '=', params.id)

    const eventids = eventUsers.map(function (item) {
      return item.event_id
    })

    const events = await Event.query().whereIn('id', eventids).with('User').with('Files').fetch()

    return events
  }
}

module.exports = EventUserController
