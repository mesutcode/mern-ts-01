import React, { useContext } from 'react'
import { Product } from './types/Product'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { CartProduct, Store } from './Store'
import { convertProductToCartProduct } from './utils'
import { toast } from 'react-toastify'

export default function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)

  const {
    cart: { cartProducts },
  } = state

  const addToCartHandler = (product: CartProduct) => {
    const existProduct = cartProducts.find((x) => x._id === product._id)
    const quantity = existProduct ? existProduct.quantity + 1 : 1
    if (product.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_PRODUCT',
      payload: { ...product, quantity },
    })
    toast.success('Product added to the cart')
  }
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() =>
              addToCartHandler(convertProductToCartProduct(product))
            }
          >
            Add to card
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
