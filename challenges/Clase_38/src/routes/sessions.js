import express from 'express';
import sessionController from '../controllers/sessions.js'
import {passportCall} from '../middlewares/session.js'
const router = express.Router();


router.post('/register',passportCall('register'),sessionController.register)
router.post('/login',passportCall('login'),sessionController.login)

export default router;