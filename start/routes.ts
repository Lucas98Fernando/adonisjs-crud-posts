import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Auth routes
Route.post('/register', 'UsersController.register')
Route.post('/login', 'UsersController.login')

// Posts routes
Route.resource('/posts', 'PostsController')
  .apiOnly()
  .middleware({
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
