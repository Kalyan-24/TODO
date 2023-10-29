import express from 'express'
import { getLoginController, postLoginController, getRegisterController, postRegisterController, postUserNameAvailability, postEmailAvailability, logoutController } from '../controllers/Auth.js'
import { isAuthenticated } from '../middlewares/Auth.js'


const router = express.Router()

router.get('/login', isAuthenticated, getLoginController)
router.post('/api/v1/login', postLoginController)

router.get('/register', isAuthenticated, getRegisterController)
router.post('/api/v1/register', postRegisterController)

router.post('/api/v1/check-username-availability', postUserNameAvailability)
router.post('/api/v1/check-email-availability', postEmailAvailability)

router.get('/logout', logoutController)

export default router