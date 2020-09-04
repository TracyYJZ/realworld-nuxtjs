<template>
  <nav>
    <ul class="pagination">
      <li
        data-test="page-link-1"
        :class="{
          'page-item': true,
          active: item === page,
        }"
        v-for="item in total"
        :key="item"
      >
        <nuxt-link
          :to="{
            name: 'home',
            query: {
              page: item,
              tab: $route.query.tab,
              tag: $route.query.tag,
            },
          }"
          class="page-link"
        >
          {{ item }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    // 总页数
    total: {
      type: Number,
      required: true,
    },
    // 页号
    page: {
      type: Number,
      required: true,
    },
  },
}
</script>
