import { Router } from 'express'
import { fetchUsers, fetchUser } from '../controllers/userController.js'
const userRouter = Router()

userRouter.get('/', fetchUsers)
userRouter.get('/:userId', fetchUser)

export default userRouter
