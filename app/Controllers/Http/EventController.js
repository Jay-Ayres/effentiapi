'use strict'

const Event = use('App/Models/Event')
const User = use('App/Models/User')

class EventController {
  async index ({ params, request, response }) {


    const { page } = request.get()

    // const events = await Event.query().with('User').with('Files').paginate(page)
    //const events = await Event.find(1)
    //console.log(events)
   // const teste =  await events.users().fetch()
    const teste = await Event.query().where('id', 1).with('users').fetch()
    console.log("logando teste")
    console.log(teste)
    //const teste = events.data[0]
    //console.log(teste)

    return teste


  }

  async store ({ request }) {
    const data = request.only(['user_id', 'name', 'description', 'event_date', 'event_end_date'])
    const users = await User.query().fetch()

    let idsusers = users.rows.map(user => user.id)
    const event = await Event.create(data)

    await event.users().attach(idsusers)

    return event
  }

  async update ({ params, request }) {
    const event = await Event.findOrFail(params.id)
    const data = request.only(['user_id', 'name', 'description', 'event_date', 'event_end_date'])

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
