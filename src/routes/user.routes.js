import { Router } from 'express'
import uploadService from '../services/uploadService.js'
import { createUser, fetchUsers, fetchUser, updateUser, deleteUser } from '../controllers/userController.js'
const userRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *      example:
 *        firstName: Bogdan
 *        lastName: Bedyukh
 *        email: bedyukhedits@gmail.com
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: New user created
 */

userRouter.post('/', uploadService.single('avatar'), createUser)

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: All users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
userRouter.get('/', fetchUsers)

userRouter.get('/:userId', fetchUser)

userRouter.put('/:userId', uploadService.single('avatar'), updateUser)

userRouter.delete('/:userId', deleteUser)

export default userRouter
