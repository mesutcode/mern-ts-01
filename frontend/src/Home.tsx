import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Product } from './types/Product'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { ApiError, getError } from './utils'

type State = {
  products: Product[]
  loading: boolean
  error: string
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAIL'; payload: string }

const initialState: State = {
  products: [],
  loading: true,
  error: '',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default function Home() {
  const [{ products, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    async function getProducts() {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error as ApiError) })
      }
    }
    getProducts()
  }, [])

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant={'danger'}>{error}</MessageBox>
  ) : (
    <Row>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={'/product/' + product.slug}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
