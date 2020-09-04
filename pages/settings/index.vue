<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onUpdate">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                  minlength="8"
                  v-model="password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr />

          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'SettingsIndex',
  middleware: 'auth',
  data: function() {
    const { image, username, bio, email } = this.$store.state.user
    return {
      user: {
        image,
        username,
        bio,
        email,
      },
      password: '',
    }
  },
  methods: {
    // 更新用户
    async onUpdate() {
      const {
        data: { user },
      } = await updateUser(
        this.password.length === 0
          ? this.user
          : {
              ...this.user,
              password: this.password, // 密码有更新才带上这个字段
            }
      )
      // 更新store和cookie里的用户数据
      this.$store.commit('setUser', user)
      Cookie.set('user', user)
      // 跳转到用户页
      this.$router.push(`profile/${user.username}`)
    },
    // 登出
    logout() {
      // 清除store和cookie里的用户数据
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      // 跳转到主页
      this.$router.push('/')
    },
  },
}
</script>
