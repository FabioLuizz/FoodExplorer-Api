const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../config/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ProductControllers = require('../controllers/ProductControllers')

const productControllers = new ProductControllers()

const ProductRoutes = Router()
const upload = multer(uploadConfig.MULTER)

ProductRoutes.get('/', productControllers.index)
ProductRoutes.get('/:id', productControllers.show)
ProductRoutes.put('/:id', ensureAuthenticated, upload.single("photo"), productControllers.update)
ProductRoutes.delete('/:id', productControllers.delete)
ProductRoutes.post('/', ensureAuthenticated, upload.single("photo"), productControllers.create)

module.exports = ProductRoutes