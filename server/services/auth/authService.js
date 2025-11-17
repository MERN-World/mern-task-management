import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { env } from '../../config/env.js'
import jwt from 'jsonwebtoken'
import RefreshToken from '../../models/RefreshToken.js'

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, env.PASSWORD_SALT)
}

export const verifyPassword = async (original, hashed) => {
  return await bcrypt.compare(original, hashed)
}

export const generateAccessToken = async (user) => {
  const payload = {
    sub: user._id.toString(),
    jti: uuidv4(),
    roles: user.roles?.map((r) => (typeof r === 'string' ? r : r.slug)) || []
  }

  return {
    token: jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h'}),
    jti: payload.jti
  }
}

export const generateRefreshToken = async ({ userId, ip, deviceInfo }) => {
  const jti = uuidv4()
  const plainToken = `${jti}.${uuidv4()}.${Math.random()
    .toString(36)
    .slice(2, 18)}`
  const tokenHash = await hashPassword(plainToken)
  const expiresAt = new Date(
    Date.now() + env.REFRESH_DAYS * 24 * 60 * 60 * 1000
  )

  await RefreshToken.create({
    user: userId,
    jti,
    tokenHash,
    createdByIp: ip,
    expiresAt,
    deviceInfo
  });

  return { token: plainToken, jti, expiresAt }
}

export const verifyRefreshToken = async (plainToken) => {
  const [jti] = plainToken.split('.')

  if (!jti) return null

  const tokenDoc = await RefreshToken.findOne({ jti })
  if (!tokenDoc) return null

  if (tokenDoc.expiresAt < new Date() || tokenDoc.revokedAt) return tokenDoc

  const match = await verifyPassword(plainToken, tokenDoc.tokenHash)
  if (!match) return null

  return tokenDoc
}

export const revokeRefreshToken = async (tokenDoc, ip, replacedBy = null) => {
  tokenDoc.revokedAt = new Date()
  tokenDoc.revokedByIp = ip
  if (replacedBy) tokenDoc.replacedBy = replacedBy
  await tokenDoc.save()
}

export const revokeAllUserTokens = async (userId) => {
  await RefreshToken.updateMany(
    { user: userId, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  )
}
