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
  async store ({ request, response }) {
    console.log('teste')

    request.multipart.file('file', {}, async file => {
      try {

        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const key = `${Date.now()}.${file.subtype}`

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL
        })

        await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })
      } catch (error) {
        return response.status(err.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
    }).process()
  }

  async storePost ({ request, response, params }) {

    request.multipart.file('file', {}, async file => {
      try {
        console.log('teste!!@')
        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const key = `${Date.now()}.${file.subtype}`

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL
        })
        console.log('logando')
        console.log(url)

        const imagem = await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })

        const post = await Post.findOrFail(params.id)
        post.file_id = imagem.id
        await post.save()
      } catch (error) {
        return response.status(err.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
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
        console.log('logando')
        console.log(url)

        const imagem = await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })

        const event = await Event.findOrFail(params.id)
        event.file_id = imagem.id
        await event.save()
      } catch (error) {
        return response.status(err.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
    }).process()
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
}

module.exports = FileController
