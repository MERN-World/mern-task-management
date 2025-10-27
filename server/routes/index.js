import express from 'express'
import roleRoutes from '../routes/auth/roleRoute.js'


const router = express.Router();

router.use("/role", roleRoutes); 


export default router