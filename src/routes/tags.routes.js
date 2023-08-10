const { Router } = require('express')

const TagsController = require('../controllers/TagsController')
const tagsController = new TagsController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const TagsRoutes = new Router()

TagsRoutes.get('/:id', ensureAuthenticated, tagsController.index)

module.exports = TagsRoutes
