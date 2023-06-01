import cors from 'cors'
import express, { Request, Response } from 'express'
import { sampleProducts } from './data'

const app = express()
app.use(cors())
app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

app.get('/api/products/:slug', (req: Request, res: Response) => {
  res.json(sampleProducts.find((product) => product.slug === req.params.slug))
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
