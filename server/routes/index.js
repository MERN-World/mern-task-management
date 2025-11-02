import express from 'express'
import authRoutes from '../routes/auth/authRoutes.js'
import roleRoutes from '../routes/auth/roleRoute.js'
import { successResponse } from '../utils/responseHandler.js';


const router = express.Router();

router.use('/auth',authRoutes)
router.use("/role", roleRoutes); 


export default router