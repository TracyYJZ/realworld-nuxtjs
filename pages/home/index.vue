<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          
          <template v-if="articles.length === 0">
            <div class="article-preview">No articles are here... yet.</div>
          </template>
          <template v-else>
            <article-preview v-for="article in articles" :key="article.slug" :article="article" />
            <pagination :page="page" :total="total" />
          </template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    page: $route.query.page,
                    tab: 'tag',
                    tag,
                  },
                }"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import ArticlePreview from '@/components/article-preview'
import Pagination from '@/components/pagination'

const limit = 20

export default {
  name: 'HomeIndex',
  components: {
    ArticlePreview,
    Pagination,
  },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1)
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles
    const [
      {
        data: { articles, articlesCount },
      },
      {
        data: { tags },
      },
    ] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ])
    const total = Math.ceil(articlesCount / limit)
    return {
      total, // 总页数
      page, // 页号
      articles, // 文章列表
      tags, // 标签列表
      tab, // 选项卡
      tag, // 标签
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watchQuery: ['page', 'tag', 'tab'], // 监听 query 变化调用asyncData
}
</script>

<style></style>
