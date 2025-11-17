import {
  authenticate,
  authorize
} from '../../middleware/authorizeMiddleware.js'

import { sendTestEmail } from '../../controllers/setting/settingController.js'
import express from 'express'

const router = express.Router()

router.use(authenticate)

router.post('/test-email',sendTestEmail)

export default router