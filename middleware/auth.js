export default function({ store, redirect }) {
  // 未登录状态状态下跳转
  if (!store.state.user) {
    redirect('/login')
  }
}
