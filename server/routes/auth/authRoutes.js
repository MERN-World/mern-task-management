import express from 'express'
import {login,refresh,logout,revokeAllSessions} from '../../controllers/auth/authController.js'
const router = express.Router()

router.post("/login", login)
router.post("/refresh", refresh);   
router.post("/logout", logout);
router.post("/revoke-all/:userId", revokeAllSessions);


export default router