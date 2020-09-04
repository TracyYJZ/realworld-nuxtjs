<template>
  <div>
    <template v-if="user">
      <form class="card comment-form" @submit.prevent="onPublish()">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            ref="comment_body"
            required
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
    </template>
    <template v-else>
      <nuxt-link to="/login">Sign in</nuxt-link> or <nuxt-link to="/register">Sign up</nuxt-link> to
      add comments on this article.
    </template>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | formatDate('MMM DD, YYYY') }}</span>
        <span class="mod-options" v-if="user && user.username === comment.author.username">
          <i class="ion-trash-a" @click="onDelete(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getComments, publishComment, deleteComment } from '@/api/article'

export default {
  name: 'ArticleComment',
  data() {
    return {
      comments: [], // 评论列表
    }
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    // 评论无需 seo，只在客户端渲染
    this.getComments()
  },
  methods: {
    // 获取评论
    async getComments() {
      const {
        data: { comments },
      } = await getComments(this.article.slug)
      this.comments = comments
    },
    // 发布评论
    async onPublish() {
      await publishComment(this.article.slug, {
        body: this.$refs.comment_body.value,
      })
      // 成功后重新获取评论
      await this.getComments()
      this.$refs.comment_body.value = ''
    },
    async onDelete(comment) {
      await deleteComment(this.article.slug, comment.id)
      // 成功后重新获取评论
      await this.getComments()
    },
  },
}
</script>
