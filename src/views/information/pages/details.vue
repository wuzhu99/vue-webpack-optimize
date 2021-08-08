<template>
  <div class="container">
    <p class="title">{{ title }}</p>
    <p class="time" v-if="time">{{ time }}</p>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import { getUrlString } from "../../../utils";

export default {
  data() {
    return {
      channel: getUrlString("channel"),
      id: "",
      type: "",
      title: "",
      content: ""
    };
  },
  created() {
    if (this.channel && this.channel === "07") {
      this.id = getUrlString("id");
      this.type = getUrlString("type");
    } else {
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
    }
  },
  mounted() {
    document.querySelector("body").setAttribute("style", "background: #fff");
    switch (this.type) {
      case "help":
        this.getHelpDetails();
        break;
      case "notice":
        this.getNoticeDetails();
        break;
      case "news":
        this.getNewsDetails();
        break;
    }
  },
  methods: {
    getHelpDetails() {
      this.$request("/OP/OP04", {
        id: this.id
      }).then(res => {
        if (res.result != "0") {
          this.$toast.fail(res.msg);
        } else {
          this.title = res.title;
          this.content = res.content;
        }
      });
    },
    getNoticeDetails() {
      this.$request("/OP/OP07", {
        id: this.id
      }).then(res => {
        if (res.result != "0") {
          this.$toast.fail(res.msg);
        } else {
          this.title = res.title;
          this.time = res.push_time;
          this.content = res.content;
        }
      });
    },
    getNewsDetails() {
      this.$request("/U/U008", {
        msg_id: this.id
      }).then(res => {
        if (res.result != "0") {
          this.$toast.fail(res.msg);
        } else {
          this.title = res.msg_title;
          this.time = res.create_time;
          this.content = res.content;
        }
      });
    }
  },
  destroyed() {
    document.querySelector("body").setAttribute("style", "");
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.container {
  padding: 0.4rem 0.3rem;
  .title {
    width: 100%;
    @include font(0.36rem, #333);
    line-height: 0.5rem;
  }
  .time {
    margin-top: 0.3rem;
    width: 100%;
    @include font(0.24rem, #999);
    line-height: 0.34rem;
  }
  .content {
    width: 100%;
    margin-top: 0.52rem;
    @include font(0.28rem, #333);
    line-height: 0.54rem;
  }
}
</style>
