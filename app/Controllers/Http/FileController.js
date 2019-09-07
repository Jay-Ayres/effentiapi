'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
const Drive = use('Drive')
const File = use('App/Models/File')
const Helpers = use('Helpers')
const Post = use('App/Models/Post')
const Event = use('App/Models/Event')
const User = use('App/Models/User')

class FileController {
  async store ({ request, response, params }) {
    request.multipart.file('file', {}, async file => {
      try {
        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const key = `${Date.now()}.${file.subtype}`

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL
        })

        const imagem = await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })

        const data = { file_id: '' }

        data.file_id = imagem.id

        const user = await User.findOrFail(params.id)
        user.merge(data)

        await user.save().process()
      } catch (error) {
        return response.status(error.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
    }).process()
  }

  async storePost ({ request, response, params }) {
    request.multipart.file('file', {}, async file => {
      try {
        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const key = `${Date.now()}.${file.subtype}`

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL
        })

        const imagem = await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })

        const data = { file_id: '' }

        data.file_id = imagem.id

        const post = await Post.findOrFail(params.id)
        post.merge(data)

        await post.save().process()
      } catch (error) {
        return response.status(error.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
    }).process()
  }

  async storeEvent ({ request, response, params }) {
    request.multipart.file('file', {}, async file => {
      try {
        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const key = `${Date.now()}.${file.subtype}`

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL
        })

        const imagem = await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })

        const data = { file_id: '' }

        data.file_id = imagem.id

        const event = await Event.findOrFail(params.id)
        event.merge(data)
        await event.save().process()
      } catch (error) {
        return response.status(error.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
    }).process()
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async index ({ request, response, view }) {
    const files = await File.query().fetch()

    return files
  }
}

module.exports = FileController
