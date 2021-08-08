<!--  -->
<template>
  <div class="site-details-page">
    <div class="details-header">
      <span class="label left" :class="{ change: order == 1 }"
        >泰州市汽车站</span
      >
      <img src="@/assets/img/zsgj_zh@2x.png" alt="" @click="handleOrder" />
      <span class="label right" :class="{ change: order == 1 }"
        >泰州市火车站</span
      >
      <div class="time">首06:00 末19:00 | 票价: 2元</div>
    </div>
    <div class="details-steps">
      <van-steps direction="vertical" :active="-1" inactive-color="#2672B6">
        <van-step v-for="(item, index) in 6" :key="index" class="item">
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :name="index">
              <div
                slot="title"
                class="title"
                :class="{ active: activeNames == index }"
              >
                <span>泰州汽车站</span>
                <img src="@/assets/img/zsgj_gj@2x.png" alt="" />
              </div>
              <div class="content">
                <div>
                  <p class="left-green">还有1站/0.5km</p>
                  <p class="left-gray">苏M5H62</p>
                </div>
                <div class="right">
                  <img src="@/assets/img/zsgj_zp@2x.png" alt="" />
                  电子站牌
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      order: 0,
    };
  },

  created() {},

  methods: {
    handleOrder() {
      this.order = this.order == 1 ? 0 : 1;
    },
  },
};
</script>
<style lang='scss' scoped>
.site-details-page {
  padding: 0.6rem 0.24rem;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #2672b6 0%,
    transparent 50%,
    transparent 100%
  );
  .details-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.62rem 0.42rem 0.28rem;
    border-radius: 0.16rem;
    background: #fff;
    color: #333;
    .label {
      display: inline-block;
      width: 2.4rem;
      margin-bottom: 0.29rem;
      padding-bottom: 0.2rem;
      text-align: center;
      font-size: 0.32rem;
      border-bottom: 1px solid #eee;
      transform: translate3d(0, 0, 0);
    }
    .left.change {
    }
    > img {
      width: 0.6rem;
      height: 0.6rem;
    }
    .time {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.68rem;
      font-size: 0.24rem;
      color: #4b7090;
      background: #f4f8fb;
    }
  }
  .details-steps {
    margin: 0.2rem 0;
    border-radius: 0.16rem;
    background: #fff;
    overflow: hidden;
    .item {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.28rem;
        color: #333;
        img {
          width: 0.34rem;
        }
      }
      .title.active {
        font-size: 0.32rem;
      }
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.24rem 0.3rem;
        width: 100%;
        height: 1.2rem;
        border-radius: 0.06rem;
        background: #f4f8fb;
        .left-green {
          font-size: 0.28rem;
          color: #1ebb90;
        }
        .left-gray {
          margin-top: 0.05rem;
          font-size: 0.2rem;
          color: #999999;
        }
        .right {
          font-size: 0.2rem;
          color: #999;
          text-align: center;
          img {
            width: 0.32rem;
            margin: 0 auto 2px;
          }
        }
      }
    }
  }
}
>>> .van-step__circle {
  width: 8px;
  height: 8px;
  background: #fff !important;
  border: 2px solid rgb(38, 114, 182);
}
>>> .van-step--vertical .van-step__circle-container,
.van-step--vertical .van-step__circle-container {
  top: 30px;
}
>>> .van-step__line {
  top: 30px;
}
</style>
