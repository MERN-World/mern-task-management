import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} from '../../controllers/auth/roleController.js'

import {
  authenticate,
  authorize
} from '../../middleware/authorizeMiddleware.js'

import { PERMISSIONS } from '../../config/permissions.js'
import express from 'express'

const router = express.Router()

router.use(authenticate)

router.post('/', authorize(PERMISSIONS.ROLE.CREATE), createRole)
router.get('/', authorize(PERMISSIONS.ROLE.LIST), getAllRoles)
router.get('/:id', authorize(PERMISSIONS.ROLE.VIEW), getRoleById)
router.put('/:id', authorize(PERMISSIONS.ROLE.UPDATE), updateRole)
router.delete('/:id', authorize(PERMISSIONS.ROLE.DELETE), deleteRole)

export default router
