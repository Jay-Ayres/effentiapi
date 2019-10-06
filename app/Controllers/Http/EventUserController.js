'use strict'

const Database = use('Database')
const Event = use('App/Models/Event')
const EventUser = use('App/Models/EventUser')

class EventUserController {
  async update ({ params, request }) {
    
    const eventUsere = await EventUser.query().where({ event_id: params.event_id, user_id: params.user_id }).fetch()

    const data = request.only(['isConfirmed'])

    eventUser.merge(data)

    await eventUser.save()
  
    return eventUser
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
