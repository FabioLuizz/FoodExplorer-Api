const knex = require('../database/knex')

class FavoritesController {
  async create(request, response) {
    const { product_id } = request.params
    const user_id = request.user.id

    const favorites = await knex('favorites').where({ product_id, user_id })

    if (favorites.length === 1) {
      await knex('favorites').where({ product_id, user_id }).delete()
      return response.json(product_id)
    }

    await knex('favorites').insert({ product_id, user_id }) 

    return response.json(product_id)
  }

  async index(request, response) {
    const user_id = request.user.id
    
    const favorites = await knex("favorites").where({user_id});

    return response.json(favorites)
  }
}


module.exports = FavoritesController;