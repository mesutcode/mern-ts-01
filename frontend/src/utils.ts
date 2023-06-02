import { CartProduct } from './Store'
import { Product } from './types/Product'

export type ApiError = {
  message: string
  response: {
    data: {
      message: string
    }
  }
}

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertProductToCartProduct = (product: Product): CartProduct => {
  const cartProduct: CartProduct = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartProduct
}
