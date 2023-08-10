const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppErrors')
const { hash, compare } = require('bcryptjs')

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

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id
    ])

    const checkEmailUpdated = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkEmailUpdated && checkEmailUpdated.id !== user.id) {
      throw new AppError(
        'Este email já esta sendo utilizado por outro usuário.'
      )
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (!password && old_password) {
      throw new AppError('Digite a senha que deseja atualizar!')
    } else if (password && !old_password) {
      throw new AppError('Digite a senha antiga para prosseguir!')
    }

    if (password && old_password) {
      const checkUpdatePassword = await compare(old_password, user.password)

      if (!checkUpdatePassword) {
        throw new AppError('Senha antiga incorreta!')
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `UPDATE users SET name = ?, email = ?, password = ?, update_at = DATETIME('now') WHERE id = ? `,
      [user.name, user.email, user.password, user_id]
    )

    response.json('Usuário atualizado com sucesso')
  }
}

module.exports = UserController
