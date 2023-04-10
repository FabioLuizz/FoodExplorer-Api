const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppErrors')
const authConfig = require('../config/Auth')
const { sigin } = require('jsonwebtoken')
const { hash } = require('bcryptjs')

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkEmailExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkEmailExist) {
      throw new AppError('Este email já esta sendo utilizado!')
    }

    const hashPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashPassword]
    )

    response.json('Usuário cadastrado com sucesso!')
  }
}

module.exports = UserController
