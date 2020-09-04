import { request } from '@/plugins/request'

// 登录
export const login = (data) =>
  request({
    method: 'POST',
    url: '/users/login',
    data,
  })

// 注册
export const register = (data) =>
  request({
    method: 'POST',
    url: '/users',
    data,
  })

// 获取用户
export const getUser = () =>
  request({
    method: 'GET',
    url: '/user',
  })

// 更新用户
export const updateUser = (data) =>
  request({
    method: 'PUT',
    url: '/user',
    data,
  })
