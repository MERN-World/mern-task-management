import express from 'express'
import { authenticate, authorize } from '../../middleware/authorizeMiddleware.js'
import { PERMISSIONS } from '../../config/permissions.js'
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../../controllers/auth/userController.js'

const router = express.Router()

router.use(authenticate)

router.post('/', authorize(PERMISSIONS.USER.CREATE), createUser)
router.get('/', authorize(PERMISSIONS.USER.LIST), getAllUsers)
router.get('/:id', authorize(PERMISSIONS.USER.VIEW), getUserById)
router.put('/:id', authorize(PERMISSIONS.USER.UPDATE), updateUser)
router.delete('/:id', authorize(PERMISSIONS.USER.DELETE), deleteUser)

export default router
