const knex = require('../database/knex')

class ProductControllers {
  async create(request, response) {
    const { name, group, tag, price, description } = request.body
    const user_id = request.user.id

    const product_id = await knex('products').insert({
      name,
      group,
      description,
      price,
      user_id
    })

    const tagsInsert = await tag.map(name => {
      return {
        name,
        user_id,
        product_id
      }
    })

    await knex('ingredients').insert(tagsInsert)

    return response.json('Nota cadastrada!')
  }
}

module.exports = ProductControllers
