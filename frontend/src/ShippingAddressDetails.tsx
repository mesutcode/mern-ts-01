import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from './Store'
import { Helmet } from 'react-helmet-async'
import CheckOutSteps from './CheckOutSteps'
import { Button, Container, Form } from 'react-bootstrap'

export default function ShippingAddressDetails() {
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress },
  } = state
  const [fullName, setFullName] = useState(shippingAddress.fullName || '')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
  }, [userInfo, navigate])

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    })

    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    )
    navigate('/paypal')
  }

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <Container className="small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}
