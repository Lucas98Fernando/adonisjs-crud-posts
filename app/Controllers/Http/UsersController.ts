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
      return { token: token.token, name: auth.user?.name, email: auth.user?.email }
    } catch (error) {
      if (
        error.responseText === 'E_INVALID_AUTH_PASSWORD: Password mis-match' ||
        error.responseText === 'E_INVALID_AUTH_UID: User not found'
      ) {
        return response.status(401).send({ message: 'E-mail ou senha incorretos!' })
      } else {
        return response.badRequest({ message: 'Não foi possível fazer login' })
      }
    }
  }

  public async validateToken({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()
      auth.use('api').isAuthenticated
    } catch {
      return response.badRequest({ message: 'O usuário não está autenticado!' })
    }
  }
}
