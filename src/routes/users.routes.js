const { Router } = require('express')

const UserController = require('../controllers/UserControllers')
const userController = new UserController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersRoutes = new Router()

UsersRoutes.post('/', userController.create)
UsersRoutes.put('/', ensureAuthenticated, userController.update)

module.exports = UsersRoutes
