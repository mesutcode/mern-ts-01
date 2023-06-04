import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import Home from './Home'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './ProductDetails'
import { StoreProvider } from './Store'
import CartDetails from './CartDetails'
import Signin from './Signin'
import SignUp from './SignUp'
import ShippingAddressDetails from './ShippingAddressDetails'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="product/:slug" element={<ProductDetails />} />
      <Route path="cart" element={<CartDetails />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="shipping" element={<ShippingAddressDetails />} />
    </Route>
  )
)

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
