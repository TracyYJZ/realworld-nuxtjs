import { request } from '@/plugins/request'

// 关注作者
export const follow = (username) =>
  request({
    method: 'POST',
    url: `/profiles/${username}/follow`,
  })

// 取关作者
export const unfollow = (username) =>
  request({
    method: 'DELETE',
    url: `/profiles/${username}/follow`,
  })

// 获取用户信息
export const getProfile = (username) =>
  request({
    method: 'GET',
    url: `/profiles/${username}`,
  })
