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
    console.log('outro l')
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
    console.log('log')
    request.multipart.file('file', {}, async file => {
      console.log("dentro do metodo")

      try {
        console.log('dentro do try')
        const ContentType = file.headers['content-type']
        const ACL = "public-read"
        const key = `${Date.now()}.${file.subtype}`

        const url = await Drive.put(key, file.stream, {
          ContentType,
          ACL
        }).process()

        const imagem = await File.create({
          name: file.clientName,
          key: key,
          url: url,
          contentType: ContentType
        })

        console.log('imagem criada')

        const data = { file_id: '' }
        console.log('visualizando data')
        console.log(data)

        data.file_id = imagem.id

        console.log('dtacom imagem')
        console.log(data)

        const post = await Post.findOrFail(params.id)
        console.log('visualizando Post encontrado')
        console.log(post)
        post.merge(data)
        console.log('Visualizando post apos merge')

        await post.save()
        console.log('post salvo')

      } catch (error) {
        return response.status(error.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
    }).process()
  }

  async storeOnly ({ request, response, params }) {
    console.log('log')
    request.multipart.file('file', {}, async file => {
      console.log("dentro do metodo")
      /*
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

        console.log('imagem criada')

        const data = { file_id: '' }
        console.log('visualizando data')
        console.log(data)

        data.file_id = imagem.id

        console.log('dtacom imagem')
        console.log(data)

        const post = await Post.findOrFail(params.id)
        console.log('visualizando Post encontrado')
        console.log(post)
        post.merge(data)
        console.log('Visualizando post apos merge')

        await post.save()
        console.log('post salvo')

      } catch (error) {
        return response.status(error.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
      }
      */
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
