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

class FileController {
  async store ({ request, response }) {

    request.multipart.file('image', {}, async file => {
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

    // try {
    //   // eslint-disable-next-line no-useless-return
    //   if (!request.file('file')) return

    //   // const upload = request.file('file', { size: '2mb' })
    //   const upload = request.file('file')
    //   const fileName = `${Date.now()}.${upload.subtype}`

    //   await upload.move(Helpers.tmpPath('uploads'), {
    //     name: fileName
    //   })

    //   if (!upload.moved()) {
    //     throw upload.error()
    //   }

    //   const file = await File.create({
    //     file: fileName,
    //     name: upload.clientName,
    //     type: upload.type,
    //     subtype: upload.subtype
    //   })


    //   params = {Bucket: myBucket, Key: myKey, Body: upload }
    //   s3.putObject(params, function(err, data) {

    //     if (err) {

    //         console.log(err)

    //     } else {

    //         console.log("Successfully uploaded data to myBucket/myKey");

    //     }

    //  });

    //   return file

    // } catch (err) {
    //   return response.status(err.status).send({ error: { message: 'Erro ao fazer upload de arquivo' } })
    // }

  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
}

module.exports = FileController
