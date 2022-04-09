import { Router } from 'express'
import { fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import uploadService from '../services/uploadService.js'

const productRouter = Router()

productRouter.post('/', uploadService.single('picture'), createProduct)

productRouter.get('/', fetchProducts)

productRouter.get('/:productId', fetchProduct)

productRouter.put('/:productId', uploadService.single('picture'), updateProduct)

productRouter.delete('/:productId', deleteProduct)

export default productRouter
