<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter.prevent="addTag"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, idx) in article.tagList"
                    :key="tag"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="removeTag(idx)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, publishArticle, updateArticle } from '@/api/article'

export default {
  name: 'EditorIndex',
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'auth',
  async asyncData({ params }) {
    if (params.slug) {
      // 已有文章
      const {
        data: { article },
      } = await getArticle(params.slug)
      return {
        article,
      }
    }
    // 新文章
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },
  methods: {
    // 提交文章
    async onSubmit() {
      const { data } = this.$route.params.slug
        ? await updateArticle(this.$route.params.slug, this.article) // 更新已有文章
        : await publishArticle(this.article) // 发布新文章
      // 跳转到文章详情页
      const {
        article: { slug },
      } = data
      this.$router.push(`/article/${slug}`)
    },
    // 新增标签
    addTag($event) {
      const tag = $event.target.value
      if (this.article.tagList.indexOf(tag) > -1) {
        return
      }
      this.article.tagList.push(tag)
      $event.target.value = ''
    },
    // 删除标签
    removeTag(idx) {
      this.article.tagList.splice(idx, 1)
    },
  },
}
</script>
