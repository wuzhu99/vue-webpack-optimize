<!--
 * @Author: wuz
 * @Date: 2021-04-13 14:26:43
 * @LastEditTime: 2021-04-13 14:38:07
 * @FilePath: /vue-webpack-optimize/src/views/bus/pages/home.vue
-->
<!--  -->
<template>
  <div class="bus-page">
    <div class="bus-header">
      <span>“码”上开启新生活</span>
      <span>科技惠民“卡”畅行</span>
    </div>
    <div class="bus-tabs">
      <div class="item">
        <img src="@/assets/img/zsgj_zdcx@2x.png" alt="" />
        站点查询
      </div>
      <div class="item">
        <img src="@/assets/img/zsgj_xlcx@2x.png" alt="" />
        线路查询
      </div>
      <div class="item">
        <img src="@/assets/img/zsgj_gjzx@2x.png" alt="" />
        公交咨询
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang='scss' scoped>
.bus-page {
  position: relative;
  min-height: 100vh;
  padding-top: 2.88rem;
  background: url("../../../assets/img/zsgj_bj@2x.png") no-repeat left top;
  background-size: 100% auto;
}
.bus-header {
  position: absolute;
  top: 0.68rem;
  right: 0.28rem;
  width: 100%;
  text-align: right;
  font-size: 0.32rem;
  font-weight: 500;
  color: #fff;
  > span {
    display: block;
  }
  > span:first-child {
    padding-right: 0.74rem;
  }
}
.bus-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 6.94rem;
  height: 1.94rem;
  background: #fff;
  border-radius: 5px;
  > .item {
    position: relative;
    flex-basis: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    font-size: 0.24rem;
    color: #333;
    > img {
      width: 0.5rem;
    }
  }
  > .item:first-child::after,
  .item:nth-child(2)::after {
    content: "";
    position: absolute;
    right: 0;
    width: 1px;
    height: 100%;
    background: #e5e5e5;
  }
}
</style>