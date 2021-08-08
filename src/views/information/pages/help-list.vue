<!--
 * @Author: wuz
 * @Date: 2021-04-13 11:15:45
 * @LastEditTime: 2021-04-13 14:12:47
 * @FilePath: /vue-webpack-optimize/src/views/information/pages/help-list.vue
-->
<template>
  <div class="container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      style="width: 100%"
    >
      <ul>
        <li
          class="flex flex-jsb flex-acenter"
          v-for="(item, index) in helpList"
          :key="index"
          @click="toViewDetails(item.id, item.url)"
        >
          <p class="one-ellipsis">{{ item.title }}</p>
          <i class="more"></i>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import * as homeApi from '@/api/information/index'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      pageNum: 1,
      helpList: []
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.getHelpList();
      }, 500);
    },
    getHelpList() {
      homeApi.getList({
        page_size: 10,
        page_num: this.pageNum
      }).then(res => {
        if (res.result != "0") {
          this.$toast.fail(res.msg);
          this.finished = true;
        } else {
          this.helpList = this.pageNum === 1 ? res.list : [...this.helpList, ...res.list];
          this.finished = res.list.length < 10 ? true : false;
          this.loading = false;
          this.pageNum++;
        }
      });
    },
    toViewDetails(id, url) {
      if (url) {
        window.location.href = url;
      } else {
        this.$router.push({ path: "/details", query: { id: id, type: "help" } });
      }
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
@import "@/assets/css/mixin.scss";

ul {
  margin-top: 0.12rem;
  width: 100%;
  li {
    @include wh(100%, 0.96rem);
    padding: 0 0.32rem;
    /*background-color: #fff;*/
    border-bottom: 1px solid #f5f5f5;
    p {
      max-width: 80%;
      @include font(0.28rem, #333);
    }
  }
}
</style>
