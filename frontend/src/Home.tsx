import { Col, Row } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { Product } from './types/Product'
export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [])

  return (
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
