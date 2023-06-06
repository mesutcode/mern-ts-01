import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from './hooks/orderHooks'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { Helmet } from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { ApiError, getError } from './utils'
import { toast } from 'react-toastify'

export default function OrderDetails() {
  const params = useParams()
  const { id: orderId } = params

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!)

  const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation()

  const testPayHandler = async () => {
    await payOrder({ orderId: orderId! })
    refetch()
    toast.success('Order is paid')
  }

  const paidDate = `Paid at : ${order?.paidAt}`
  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Order Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  {paidDate}
                  {/* {order.paidAt} */}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderProducts.map((product) => (
                  <ListGroup.Item key={product._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
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
                        <span>{product.quantity}</span>
                      </Col>
                      <Col md={3}>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Productss</Col>
                    <Col>${order.productsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    <div>
                      <Button disabled={loadingPay} onClick={testPayHandler}>
                        Test Pay
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
