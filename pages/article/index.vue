<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" v-on:update-article="updateArticle" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" v-on:update-article="updateArticle" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'

export default {
  name: 'ArticleIndex',
  async asyncData({ params }) {
    const {
      data: { article },
    } = await getArticle(params.slug)
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article,
    }
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
  methods: {
    updateArticle(article) {
      // 避免单例
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      this.article = article
    },
  },
}
</script>
