import { request } from '@/plugins/request'

export const login = (data) =>
  request({
    method: 'POST',
    url: '/users/login',
    data,
  })

export const register = (data) =>
  request({
    method: 'POST',
    url: '/users',
    data,
  })
