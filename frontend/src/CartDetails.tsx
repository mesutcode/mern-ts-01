import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from './Store'
import { CartProduct } from './Store'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import MessageBox from './MessageBox'

export default function CartDetails() {
  const {
    state: {
      mode,
      cart: { cartProducts },
    },
    dispatch,
  } = useContext(Store)

  const navigate = useNavigate()
  const updateCartHandler = (product: CartProduct, quantity: number) => {
    if (product.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock.')
      return
    }
    dispatch({
      type: 'CART_ADD_PRODUCT',
      payload: { ...product, quantity },
    })
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartProducts.length === 0 ? (
            <MessageBox variant="">
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartProducts.map((product: CartProduct) => (
                <ListGroup.Item key={product._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(product, product.quantity - 1)
                        }
                        variant={mode}
                        disabled={product.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{product.quantity}</span>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(product, product.quantity + 1)
                        }
                        disabled={product.quantity === product.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${product.price}</Col>
                    <Col md={2}>
                      <Button variant={mode}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartProducts.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartProducts.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartProducts.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
