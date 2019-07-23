'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')

Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly()
  Route.get('/files/:id', 'FileController.show')
  Route.post('/files', 'FileController.store')
  Route.post('events', 'EventController.store')
  Route.get('events', 'EventController.index')
  Route.put('eventuser', 'EventUserController.update')
  Route.get('users', 'UserController.index')
}).middleware(['auth'])
