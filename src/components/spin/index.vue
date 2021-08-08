<!--  -->
<template>
  <div class="spin-wrapper" :class="{ loading: value }">
    <slot></slot>
    <div class="meng" v-if="value">
      <van-loading :color="color" class="loading">{{ text }}</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spin",
  props: {
    value: {
      type: Boolean,
    },
    color: {
      type: String,
      default: "#1989fa",
    },
    text: {
      type: String,
      default: "",
    },
  },
  created() {},
};
</script>
<style lang='scss' scoped>
.spin-wrapper {
  position: relative;
  .meng {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    color: #333;
    font-size: 0.24rem;
    background: rgba(255, 255, 255, 0.6);
  }
}
</style>