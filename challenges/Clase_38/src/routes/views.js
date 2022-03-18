import express from 'express';
import viewsController from '../controllers/viewsController.js';
import { passportCall } from '../middlewares/session.js';
const router = express.Router();

router.get('/',viewsController.indexView)
router.get('/users',viewsController.usersView)
router.get('/login',viewsController.loginView)
router.get('/profile',passportCall('jwt'),viewsController.profileView)
export default router;