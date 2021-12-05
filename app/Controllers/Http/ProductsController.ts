import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ auth }: HttpContextContract) {
    const id = auth.user?.id
    const products = await Product.query().select('*').where('user_id', `${id}`)
    return products
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const id = auth.user?.id
    const data = request.only(['name', 'price', 'qtd'])
    const duplicateProduct = await Product.query()
      .select('*')
      .where('user_id', `${id}`)
      .where('name', data.name)
    if (duplicateProduct.length > 0) {
      return response
        .status(400)
        .send({ message: 'Já existe um produto cadastrado com o mesmo nome' })
    } else {
      const newProduct = await Product.create({ user_id: id, ...data, status: 0 })
      return response.status(201).send(newProduct)
    }
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    return product
  }

  public async update({ params, request, response }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    const newData = request.only(['name', 'price', 'qtd', 'status'])
    if (typeof newData.price !== 'number')
      response.status(400).send({ message: 'Só é permitido valores númericos para preço.' })
    else if (typeof newData.qtd !== 'number')
      response.status(400).send({ message: 'Só é permitido valores númericos para quantidade.' })
    else {
      product.merge(newData)
      await product.save()
      return product
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return product
  }
}
