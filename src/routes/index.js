const { Router } = require('express')

const UsersRoutes = require('./users.routes')
const SessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/users', UsersRoutes)
routes.use('/', SessionsRoutes)

module.exports = routes
