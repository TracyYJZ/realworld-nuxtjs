import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = (params) =>
  request({
    method: 'GET',
    url: '/articles',
    params,
  })

// 获取关注文章列表
export const getYourFeedArticles = (params) =>
  request({
    method: 'GET',
    url: '/articles/feed',
    params,
  })

// 添加点赞
export const addFavorite = (slug) =>
  request({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  })

// 取消点赞
export const deleteFavorite = (slug) =>
  request({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`,
  })

// 获取文章详情
export const getArticle = (slug) =>
  request({
    method: 'GET',
    url: `/articles/${slug}`,
  })

// 发布文章
export const publishArticle = (data) =>
  request({
    method: 'POST',
    url: '/articles',
    data: { article: data },
  })

// 更新文章
export const updateArticle = (slug, data) =>
  request({
    method: 'PUT',
    url: `/articles/${slug}`,
    data: { article: data },
  })

// 删除文章
export const deleteArticle = (slug) =>
  request({
    method: 'DELETE',
    url: `/articles/${slug}`,
  })

// 获取评论
export const getComments = (slug) =>
  request({
    method: 'GET',
    url: `articles/${slug}/comments`,
  })

// 发布评论
export const publishComment = (slug, data) =>
  request({
    method: 'POST',
    url: `articles/${slug}/comments`,
    data: { comment: data },
  })

// 删除评论
export const deleteComment = (slug, id) =>
  request({
    method: 'DELETE',
    url: `/articles/${slug}/comments/${id}`,
  })
