import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'email', 'password'])
      if (!data.name || !data.email || !data.password) {
        return response.badRequest({
          message: 'Existem campos inválidos!',
        })
      } else {
        const user = await User.create(data)
        return response.status(201).send(user)
      }
    } catch {
      response.badRequest({ message: 'Não foi possível realizar o cadastro' })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30mins',
      })
      return token
    } catch {
      return response.badRequest({ message: 'Credenciais inválidas!' })
    }
  }

  public async validateToken({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()
      auth.use('api').isLoggedIn
    } catch {
      return response.badRequest({ message: 'O usuário não está autenticado!' })
    }
  }
}
