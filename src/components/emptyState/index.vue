<!--
 * @Author: wuz
 * @Date: 2021-03-27 18:01:30
 * @LastEditTime: 2021-04-13 14:13:21
 * @FilePath: /vue-webpack-optimize/src/components/emptyState/index.vue
-->

<template>
  <div class="empty-wrapper" v-show="show">
    <img src="~@/assets/img/icon-null.png" alt />
    <div class="empty-wrapper-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '暂无订单信息'
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.empty-wrapper {
  width: 100%;
  height: auto;
  padding-top: 1.1rem;
  text-align: center;
  font-size: 0.3rem;
  color: #999999;
}
.empty-wrapper-title {
  text-align: center;
}
.empty-wrapper img {
  width: 80%;
  display: block;
  margin: 0 auto;
}
</style>
