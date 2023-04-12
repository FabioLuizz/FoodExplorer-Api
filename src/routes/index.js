const { Router } = require('express')

const SessionsRoutes = require('./sessions.routes')
const ProductRoutes = require('./products.routes')
const UsersRoutes = require('./users.routes')

const routes = Router()

routes.use('/product', ProductRoutes)
routes.use('/users', UsersRoutes)
routes.use('/', SessionsRoutes)

module.exports = routes
