import User from '../../models/User.js'
import { hashPassword } from '../../services/auth/authService.js'
import { successResponse, errorResponse } from '../../utils/responseHandler.js'

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, roles, permissions } = req.body

    const exists = await User.findOne({ email })
    if (exists) return errorResponse(res, 'User already exists', 400)

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
      permissions
    })

    return successResponse(res, 'User created successfully', user)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'roles',
        select: '-permissions'
      })
      .populate('permissions')
    return successResponse(res, 'Users fetched successfully', users)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('roles')
      .populate('permissions')
    if (!user) return errorResponse(res, 'User not found', 404)
    return successResponse(res, 'Get user success', user)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const user = await User.findByIdAndUpdate(id, updates, { new: true })
      .populate('roles')
      .populate('permissions')
    if (!user) return errorResponse(res, 'User not found', 404)

    return successResponse(res, 'User updated successfully', user)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) return errorResponse(res, 'User not found', 404)
    return successResponse(res, 'User deleted successfully')
  } catch (error) {
    return errorResponse(res, error.message)
  }
}
