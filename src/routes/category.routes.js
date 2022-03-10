import { Router } from 'express'
import { createCategory, getCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js'
const categoryRouter = Router()

categoryRouter.post('/', createCategory)

categoryRouter.get('/:categoryId', getCategory)

categoryRouter.get('/', getCategories)

categoryRouter.put('/:categoryId', updateCategory)

categoryRouter.delete('/:categoryId', deleteCategory)

export default categoryRouter
