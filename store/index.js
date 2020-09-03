const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，每次都返回一个新的对象
export const state = () => {
  return {
    // 用户的登录状态数据
    user: null,
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    // 如果请求头中有 cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JS 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (e) {
        //  NO valid cookie found
      }
    }
    // 提交 mutation 修改 state
    commit('setUser', user)
  },
}
