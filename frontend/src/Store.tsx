import React from 'react'

export type CartProduct = {
  image: string | undefined
  slug: string
  quantity: number
  countInStock: number
  price: number
  _id: string
  name: string
}

export type ShippingAddress = {
  fullName: string
  address: string
  city: string
  country: string
  postalCode: string
}

export type Cart = {
  cartProducts: CartProduct[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  productsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}

export type UserInfo = {
  name: string
  email: string
  token: string
  isAdmin: boolean
}

type AppState = {
  mode: string
  cart: Cart
  userInfo?: UserInfo
}

const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  cart: {
    cartProducts: localStorage.getItem('cartProducts')
      ? JSON.parse(localStorage.getItem('cartProducts')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod')!)
      : 'PayPal',
    productsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
}

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_PRODUCT'; payload: CartProduct }
  | { type: 'CART_REMOVE_PRODUCT'; payload: CartProduct }
  | { type: 'USER_SIGNIN'; payload: UserInfo }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }

    case 'CART_ADD_PRODUCT':
      const newProduct = action.payload
      const existProduct = state.cart.cartProducts.find(
        (product: CartProduct) => product._id === newProduct._id
      )
      const cartProducts = existProduct
        ? state.cart.cartProducts.map((product: CartProduct) =>
            product._id === existProduct._id ? newProduct : product
          )
        : [...state.cart.cartProducts, newProduct]

      localStorage.setItem('cartProducts', JSON.stringify(cartProducts))

      return { ...state, cart: { ...state.cart, cartProducts } }
    case 'CART_REMOVE_PRODUCT': {
      const cartProducts = state.cart.cartProducts.filter(
        (product: CartProduct) => product._id !== action.payload._id
      )
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
      return { ...state, cart: { ...state.cart, cartProducts } }
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
