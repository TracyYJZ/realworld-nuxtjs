<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | formatDate('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="isSelf">
      <button class="btn btn-sm btn-outline-secondary" @click="onEditArticle">
        <i class="ion-edit"></i>
        Edit Article
      </button>
      <button class="btn btn-sm btn-outline-danger" @click="onDeleteArticle">
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm"
        :class="{
          active: article.author.following,
          'btn-outline-secondary': !article.author.following,
          'btn-secondary': article.author.following,
        }"
        @click="onSwitchFollowStatus"
      >
        <i class="ion-plus-round"></i>
        {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
      </button>
      <button
        class="btn btn-sm"
        :class="{
          active: article.favorited,
          'btn-outline-primary': !article.favorited,
          'btn-primary': article.favorited,
        }"
        @click="onSwitchFavoriteStatus"
      >
        <i class="ion-heart"></i>
        {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { follow, unfollow } from '@/api/profile'
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'

export default {
  name: 'ArticleMeta',
  props: {
    article: Object,
    required: true,
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    }
  },
  computed: {
    ...mapState(['user']),
    isSelf() {
      // 判断文章作者是否是本人
      return this.user && this.user.username === this.article.author.username
    },
  },
  methods: {
    // 编辑文章
    onEditArticle() {
      this.$router.push(`/editor/${this.article.slug}`)
    },
    // 删除文章
    async onDeleteArticle() {
      await deleteArticle(this.article.slug)
      // 跳转到主页
      this.$router.push('/')
    },
    // 切换关注状态
    async onSwitchFollowStatus() {
      // 如果还未登录，跳转到登录页
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      const { username, following } = this.article.author
      const opt = following ? unfollow : follow
      const {
        data: { profile },
      } = await opt(username)
      this.$emit('update-article', {
        ...this.article,
        author: profile,
      })
    },
    // 切换喜欢状态
    async onSwitchFavoriteStatus() {
      // 如果还未登录，跳转到登录页
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      const { slug, favorited } = this.article
      const opt = favorited ? deleteFavorite : addFavorite
      const {
        data: { article },
      } = await opt(slug)
      this.$emit('update-article', article)
    },
  },
}
</script>
