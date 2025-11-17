import { env } from '../../config/env.js'
import { successResponse, errorResponse } from '../../utils/responseHandler.js'
import User from '../../models/User.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
  verifyRefreshToken,
  revokeAllUserTokens,
  revokeRefreshToken
} from '../../services/auth/authService.js'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).populate('roles')
    if (!user) return errorResponse(res, 'Invalid credentials', null, 401)

    const pwdMatch = await verifyPassword(password, user?.password)
    if (!pwdMatch) return errorResponse(res, 'Invalid credentials', null, 401)

    const access = await generateAccessToken(user)
    const refresh = await generateRefreshToken({
      userId: user._id,
      ip: req.ip,
      deviceInfo: req.get('User-Agent')
    })

    res.cookie(env.COOKIE_NAME, refresh.token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.COOKIE_SAMESITE || 'Strict',
      maxAge: env.REFRESH_DAYS * 24 * 60 * 60 * 1000
    })

    return successResponse(
      res,
      { accessToken: access.token, refreshToken: refresh.token },
      'Logged in',
      200
    )
  } catch (err) {
    return errorResponse(res, err.message)
  }
}

export const refresh = async (req, res) => {
  try {
    const token = req.cookies?.[env.COOKIE_NAME] || req.body?.refreshToken

    const tokenDoc = await verifyRefreshToken(token)

    if (!tokenDoc) {
      return errorResponse(res, 'Invalid refresh token', null, 401)
    }

    if (tokenDoc.revokedAt || tokenDoc.expiresAt < new Date()) {
      await revokeAllUserTokens(tokenDoc.user)
      return errorResponse(res, 'Refresh token expired or revoked', null, 401)
    }

    const newRefresh = await generateRefreshToken({
      userId: tokenDoc.user,
      ip: req.ip,
      deviceInfo: req.get('User-Agent')
    })

    await revokeRefreshToken(tokenDoc, req.ip, newRefresh.jti)

    const user = await User.findById(tokenDoc.user).populate('roles')
    const access = generateAccessToken(user)

    res.cookie(env.COOKIE_NAME, newRefresh.token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.COOKIE_SAMESITE || 'Strict',
      maxAge: env.REFRESH_DAYS * 24 * 60 * 60 * 1000
    })

    return successResponse(
      res,
      'Token refreshed',
      { accessToken: access.token },
      200
    )

    if (!token) return errorResponse(res, 'No refresh token found', null, 401)
  } catch (err) {
    return errorResponse(res, err.message, null, 500)
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.[env.COOKIE_NAME] || req.body?.refreshToken
    if (token) {
      const tokenDoc = await verifyRefreshToken(token)
      if (tokenDoc) await revokeRefreshToken(tokenDoc, req.ip)
    }

    res.clearCookie(env.COOKIE_NAME, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.COOKIE_SAMESITE || 'Strict'
    })
    return successResponse(res, null, 'Logged out', 200)
  } catch (err) {
    return errorResponse(res, err.message)
  }
}

export const revokeAllSessions = async (req, res) => {
  try {
    const userId = req.params.userId
    await revokeAllUserTokens(userId)
    return successResponse(res, 'All sessions revoked' )
  } catch (err) {
    return errorResponse(res, err.message)
  }
}
