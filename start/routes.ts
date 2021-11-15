import Route from '@ioc:Adonis/Core/Route'

// Auth routes
Route.post('/register', 'UsersController.register')
Route.post('/login', 'UsersController.login')
Route.get('/validateToken', 'UsersController.validateToken')

// Posts routes
Route.resource('/products', 'ProductsController')
  .apiOnly()
  .middleware({
    index: ['auth'],
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
