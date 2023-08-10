const { Router } = require('express')

const SessionControllers = require('../controllers/SessionControllers')
const sessionsControllers = new SessionControllers()

const SessionsRoutes = Router()

SessionsRoutes.post('/', sessionsControllers.create)

module.exports = SessionsRoutes
