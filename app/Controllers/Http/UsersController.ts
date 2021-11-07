import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request }: HttpContextContract) {
    const data = request.only(['email', 'password'])
    const user = await User.create(data)
    return user
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Credenciais inválidas!')
    }
  }
}
