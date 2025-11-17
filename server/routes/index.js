import express from 'express'
import authRoutes from '../routes/auth/authRoutes.js'
import roleRoutes from '../routes/auth/roleRoute.js'
import uerRoutes from '../routes/auth/userRoute.js'
import settingRoutes from '../routes/setting/settingRoutes.js'

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/role', roleRoutes); 
router.use('/user', uerRoutes)

router.use('/setting', settingRoutes)


export default router