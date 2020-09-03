module.exports = {
  router: {
    // 修改 link 激活样式 class
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表
      routes.length = 0

      // 自定义路由表
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout'),
            children: [
              {
                path: '', // 默认子路由
                name: 'home',
                component: resolve(__dirname, 'pages/home/'),
              },
              {
                path: '/login', // 登录
                name: 'login',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/register', // 注册
                name: 'register',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/profile/:username', // 用户
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/'),
              },
              {
                path: '/settings', // 设置
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/'),
              },
              {
                path: '/editor', // 编辑
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/'),
              },
              {
                path: '/article/:slug', // 文章
                name: 'article',
                component: resolve(__dirname, 'pages/article/'),
              },
            ],
          },
        ]
      )
    },
  },
  // 注册插件
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
  server: {
    // 监听：
    // localhost/127.0.0.1-只有本机能访问到这个IP
    // 本机内网IP-同一局域网内的机器也能访问到这个IP
    // 0.0.0.0-不在同一局域网内的机器也能访问到本机的外网IP
    host: '0.0.0.0',
    port: 3000
  }
}
