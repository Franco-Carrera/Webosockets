import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import uploadService from '../services/uploadService.js'

const productRouter = Router()

productRouter.post('/', uploadService.single('picture'), createProduct)

productRouter.get('/', getProducts)

productRouter.get('/:id', getProduct)

productRouter.put('/:id', uploadService.single('picture'), updateProduct)

productRouter.delete('/:id', deleteProduct)

export default productRouter
