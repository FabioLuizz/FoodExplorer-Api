const AppError = require('../utils/AppErrors')
const Auth = require('../config/Auth')
const { verify } = require('jsonwebtoken')

function ensureAuthenticated(request, response, next) {
  const AuthHeader = request.headers.authorization

  if (!AuthHeader) {
    throw new AppError('JWT Token inválido!', 401)
  }

  const [, token] = AuthHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, Auth.jwt.secret)

    request.user = {
      id: Number(user_id),
    }

    return next()
  } catch {
    return response.json('JWT Token inválido!', 401)
  }
}

module.exports = ensureAuthenticated
