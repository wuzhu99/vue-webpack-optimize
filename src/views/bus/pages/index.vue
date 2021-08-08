<template>
  <div>
    <keep-alive>
      <router-view v-if="!!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!!$route.meta.keepAlive == false"></router-view>
  </div>
</template>

<script>
export default {
  name: "Bus",
};
</script>

