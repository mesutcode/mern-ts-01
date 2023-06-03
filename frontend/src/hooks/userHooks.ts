import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo } from '../Store'

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: String
      password: String
    }) =>
      (await apiClient.post<UserInfo>('api/users/signin', { email, password }))
        .data,
  })
