const knex = require('../database/knex')
const AppError = require('../utils/AppErrors')
const DiskStorage = require('../providers/DiskStorage');

class ProductControllers {
  async create(request, response) {
    const { title, group, ingredients, price, description } = request.body
    const user_id = request.user.id
    const photoFile = request.file.filename

    const diskStorage = new DiskStorage()

    const filename = await diskStorage.save(photoFile)
    
    const product_id = await knex('products').insert({
      photo: filename,
      title,
      group,
      description,
      price,
      user_id
    })

    const tagsInsert = await ingredients.map(name => {
      return {
        product_id,
        name: JSON.parse(name),
        user_id
      }
    })

    await knex('ingredients').insert(tagsInsert)

    return response.json(product_id)
  }

  async update(request, response) {
    const { title, group, price, description, ingredients, photo } = request.body
    const { id } = request.params
    const user_id = request.user.id

    const ingredientsUpdate = ingredients.map(name => {
      return {
        product_id: id,
        name: JSON.parse(name),
        user_id
      }
    })

    await knex('products').where({ id }).update({
      photo,
      title,
      group,
      price,
      description, 
    })

    await knex('ingredients').where('product_id', id).delete()
    await knex('ingredients').where('product_id', id).insert(ingredientsUpdate)

    response.json('Prato atualizado!')
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('products').where({ id }).delete()

    response.json('Produto deletado com sucesso!')
  }

  async index(request, response) {
    const {title, ingredients} = request.query

    let products;

    if(title) {

      const firstProducts = await knex('products')
      .whereLike('title', `%${title}%`)
      .orderBy('group');

      const secondProducts = await knex('ingredients')
      .whereLike('name', `%${title}%`)
      .innerJoin('products', 'products.id', 'ingredients.id')
      .orderBy('products.title')

      products = firstProducts.concat(secondProducts)
    } else {
      products = await knex('products')
    };

    return response.json(products)
  }

  async show(request, response) {
    const {id} = request.params
    
    const product = await knex('products').where({id})

    const ingredients = await knex('ingredients').where('product_id', id)

    return response.json({
      ...product,
      ingredients
    })
  }
}

module.exports = ProductControllers
