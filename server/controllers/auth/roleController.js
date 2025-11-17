import Role from '../../models/Role.js'
import { successResponse, errorResponse } from '../../utils/responseHandler.js'

export const createRole = async (req, res) => {
  try {
    const { title, slug, description, active } = req.body

    const exists = await Role.findOne({ slug })
    if (exists) return errorResponse(res, 'Role already exists', 400)

    const role = await Role.create({ title, slug, description, active })
    return successResponse(res, 'Role created successfully', role)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find()
      .sort({ createdAt: -1 })
      .populate('permissions')
    return successResponse(res, 'Roles fetched successfully', roles)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
    if (!role) return errorResponse(res, 'Role not found', 404)
    return successResponse(res, 'Get role success', role)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const role = await Role.findByIdAndUpdate(id, updates, { new: true })
    if (!role) return errorResponse(res, 'Role not found', 404)

    return successResponse(res, 'Role updated successfully', role)
  } catch (error) {
    return errorResponse(res, error.message)
  }
}

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params
    const role = await Role.findByIdAndDelete(id)
    if (!role) return errorResponse(res, 'Role not found', 404)
    return successResponse(res, 'Role deleted successfully')
  } catch (error) {
    return errorResponse(res, error.message)
  }
}
