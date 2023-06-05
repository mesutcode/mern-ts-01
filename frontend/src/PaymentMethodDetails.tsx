import React, { useContext, useEffect, useState } from 'react'
import { Store } from './Store'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from './CheckOutSteps'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'

export default function PaymentMethodDetails() {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { paymentMethod, shippingAddress },
  } = state

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  )

  const navigate = useNavigate()
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
    localStorage.setItem('paymentMethod', paymentMethodName)
    navigate('/placeorder')
  }

  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(event) => setPaymentMethodName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(event) => setPaymentMethodName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
