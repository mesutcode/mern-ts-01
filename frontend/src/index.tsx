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
import PaymentMethodDetails from './PaymentMethodDetails'
import ProtectedRoute from './ProtectedRoute'
import PlaceOrderDetails from './PlaceOrderDetails'
import OrderDetails from './OrderDetails'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistoryDetails from './OrderHistoryDetails'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="product/:slug" element={<ProductDetails />} />
      <Route path="cart" element={<CartDetails />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressDetails />} />
        <Route path="payment" element={<PaymentMethodDetails />} />
        <Route path="placeorder" element={<PlaceOrderDetails />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/orderhistory" element={<OrderHistoryDetails />} />
      </Route>
    </Route>
  )
)

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ 'client-id': 'sb' }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
