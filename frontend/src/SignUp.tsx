import React, { useContext, useEffect, useState } from 'react'
import { Store } from './Store'
import { useSignupMutation } from './hooks/userHooks'
import { toast } from 'react-toastify'
import { ApiError, getError } from './utils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store)

  const { mutateAsync: signup, isLoading } = useSignupMutation()

  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const data = await signup({
        name,
        email,
        password,
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" disabled={isLoading}>
            Sign Up
          </Button>
        </div>

        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  )
}
