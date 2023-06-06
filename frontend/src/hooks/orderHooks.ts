import { useMutation, useQuery } from '@tanstack/react-query'
import { CartProduct, Order, ShippingAddress } from '../Store'
import apiClient from '../apiClient'

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data,
  })

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  })

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
