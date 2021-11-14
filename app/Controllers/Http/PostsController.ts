import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  // Listagem
  public async index({}: HttpContextContract) {
    const posts = await Post.all()
    return posts
  }

  // Criação
  public async store({ auth, request }: HttpContextContract) {
    const id = auth.use('api').user?.id
    const data = request.only(['title', 'description'])
    const newPost = await Post.create({ user_id: id, ...data })
    return newPost
  }

  // Exibição específica
  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return post
  }

  // Atualização
  public async update({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const newData = request.only(['title', 'description'])
    post.merge(newData)
    await post.save()
    return post
  }

  // Exclusão
  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return post
  }
}
