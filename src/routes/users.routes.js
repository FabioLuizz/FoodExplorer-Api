const { Router } = require('express')

const UserController = require('../controllers/UserControllers')
const userController = new UserController()

const UsersRoutes = Router()

UsersRoutes.post('/', userController.create)

module.exports = UsersRoutes
