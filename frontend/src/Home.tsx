import { Col, Row } from 'react-bootstrap'
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'
import { ApiError, getError } from './utils'
import ProductCard from './ProductCard'
import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from './hooks/productHooks'

export default function Home() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant={'danger'}>{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>TS mesutnisebin</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  )
}
