'use strict'

const Helpers = use('Helpers')
const Post = use('App/Models/Post')

class PostImageController {

  async store ({ params, request }) {

    const post = await Post.findOrFail(params.id)
    const data = request.only(['name', 'description'])

    post.merge(data)

    await post.save()

    return post
  }
}

module.exports = PostImageController
