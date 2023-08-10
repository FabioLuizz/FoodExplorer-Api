const knex = require('../database/knex')
const AppError = require('../utils/AppErrors')

class TagsController {
  async index(request, response) {
    const {id} = request.params

    const tags = await knex("ingredients").where({product_id: id})

    if(!tags) {
      throw new AppError('O ingrediente foi encontrado!', 400)
    }

    return response.json({tags})
  }
}

module.exports = TagsController