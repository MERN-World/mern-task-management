import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { unauthorized, forbidden } from '../utils/responseHandler.js'
import { env } from '../config/env.js'

const { JWT_SECRET } = env

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return unauthorized(res, 'No token provided')
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = {
      id: payload.sub,
      roles: payload.roles || [],
      jti: payload.jti
    }
    next()
  } catch (err) {
    return unauthorized(res, 'Invalid or expired token')
  }
}

export const authorize = (permission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return unauthorized(res, 'User not found')

      const allowed = await hasPermission(user, permission)
      if (!allowed) {
        return forbidden(res, 'You do not have permission for this action')
      }

      next()
    } catch (err) {
      return forbidden(res, 'Authorization failed')
    }
  }
}


export const hasPermission = async (user, permission) => {
  await user.populate({
    path: 'roles',
    populate: { path: 'permissions' }
  })
  await user.populate('permissions')

  const rolePermissions = user.roles.flatMap((role) =>
    role.permissions.map((p) => p.name)
  )
  const userPermissions = user.permissions.map((p) => p.name)

  return (
    rolePermissions.includes(permission) || userPermissions.includes(permission)
  )
}
