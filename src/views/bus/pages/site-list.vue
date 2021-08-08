<!--  -->
<template>
  <div class="site-list-page">
    <p class="title">过站车辆</p>
    <ul class="list-container">
      <li class="item" v-for="(item, index) in 6" :key="index">
        <div class="item-head">
          <van-tag type="primary" color="#2672B6">66路</van-tag> 公交
        </div>
        <div class="item-step">
          <span>泰州汽车站</span
          ><img src="@/assets/img/zsgj_lj@2x.png" alt="" />
          <span>泰州火车站</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
};
</script>
<style lang='scss' scoped>
.site-list-page {
  .title {
    padding: 0 0.3rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #999;
  }
}
.list-container {
  padding: 0 0.3rem;
  background: #fff;
  .item {
    padding: 0.3rem 0;
    border-bottom: 1px solid #eee;
    font-size: 0.24rem;
    color: #333;
    .item-head {
      margin-bottom: 0.1rem;
    }
    .item-step {
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      font-weight: 500;
      img {
        width: 0.3rem;
        margin: 0 0.1rem;
      }
    }
  }
  .item:last-child {
    border: none;
  }
}
</style>