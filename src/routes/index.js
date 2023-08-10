const { Router } = require('express')

const FavoritesRoutes = require('./favorites.routes')
const SessionsRoutes = require('./sessions.routes')
const ProductRoutes = require('./products.routes')
const UsersRoutes = require('./users.routes')
const TagsRoutes = require('./tags.routes')

const routes = Router()

routes.use('/favorites', FavoritesRoutes)
routes.use('/product', ProductRoutes)
routes.use('/users', UsersRoutes)
routes.use('/tags', TagsRoutes)
routes.use('/sessions', SessionsRoutes)

module.exports = routes
