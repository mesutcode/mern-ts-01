import { useMutation } from '@tanstack/react-query'
import { CartProduct, Order, ShippingAddress } from '../Store'
import apiClient from '../apiClient'

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderProducts: CartProduct[]
      shippingAddress: ShippingAddress
      paymentMethod: string
      productsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  })
