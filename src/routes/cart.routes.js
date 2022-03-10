import { Router } from 'express'
import { fetchCarts, createCart, addProduct, fetchProducts, deleteProduct, deleteCart, fetchCart } from '../controllers/cartController.js'
const cartRouter = Router()

cartRouter.get('/:cartId', fetchCart)

cartRouter.get('/', fetchCarts)

cartRouter.post('/', createCart)

cartRouter.post('/:cartId/products/:productId', addProduct)

cartRouter.get('/:cartId/products', fetchProducts)

cartRouter.delete('/:cartId/products/:productId', deleteProduct)

cartRouter.delete('/:cartId', deleteCart)

export default cartRouter
