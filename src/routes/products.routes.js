const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const ProductControllers = require('../controllers/ProductControllers')
const productControllers = new ProductControllers()

const ProductRoutes = Router()

ProductRoutes.post('/', ensureAuthenticated, productControllers.create)

module.exports = ProductRoutes
