export default function({ store, redirect }) {
  // 已登录状态下跳转
  if (store.state.user) {
    return redirect('/')
  }
}
