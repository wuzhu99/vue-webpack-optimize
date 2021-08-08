<!--  -->
<template>
  <div class="site-search-page">
    <van-search
      v-model.trim="searchValue"
      placeholder="请输入站点名称，如：火车站"
      shape="round"
      @search="handleSearch"
    />
    <div class="list-container">
      <p>{{ searchValue ? "搜索历史" : { 1: "站点", 2: "公交" }[type] }}</p>
      <ul class="list" v-show="!searchValue" key="historyList">
        <li
          class="item"
          v-show="historyList.length"
          v-for="(item, index) in historyList"
          :key="index + 1"
        >
          <img :src="icon" />
          <span>{{ item }}</span>
        </li>
        <li
          class="clear"
          v-show="historyList && historyList.length"
          @click="handleClear"
        >
          清空历史记录
        </li>
        <li class="item" v-show="historyList && historyList.length == 0">
          暂无历史
        </li>
      </ul>
      <spin v-model="spinning" v-show="searchValue">
        <ul class="list" v-show="!empty">
          <li class="item" v-for="(item, index) in searchList" :key="index + 1">
            <img :src="icon" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <div class="empty" v-show="empty">
          <img src="@/assets/img/zsgj_zw@2x.png" alt="" />
          暂无查询记录
        </div>
      </spin>
    </div>
  </div>
</template>

<script>
import Spin from "@/components/spin";
export default {
  components: { Spin },
  data() {
    return {
      spinning: true,
      searchValue: "",
      historyList: [],
      searchList: [{ name: "啦啦啦啦" }],
      // 1: 站点  2: 公交
      type: this.$route.query.type,
      empty: !false,
    };
  },
  computed: {
    icon() {
      return {
        1: require("@/assets/img/zsgj_zp@2x.png"),
        2: require("@/assets/img/zsgj_xl@2x.png"),
      }[this.type];
    },
  },

  created() {
    this.getHistory();
  },

  methods: {
    getHistory() {
      let base = localStorage.getItem(
        {
          1: "SITE_SEARCH_HISTORY",
          2: "BUS_SEARCH_HISTORY",
        }[this.type]
      );
      this.historyList = JSON.parse(base) || [];
    },
    handleClear() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要清空历史记录吗",
        })
        .then(() => {
          localStorage.removeItem(
            {
              1: "SITE_SEARCH_HISTORY",
              2: "BUS_SEARCH_HISTORY",
            }[this.type]
          );
          this.getHistory();
        });
    },
    setHistory(val) {
      let data = localStorage.getItem(
        {
          1: "SITE_SEARCH_HISTORY",
          2: "BUS_SEARCH_HISTORY",
        }[this.type]
      );
      let base = data ? JSON.parse(data) : [];
      if (base.includes(val)) {
        return;
      } else {
        base.unshift(val);
        if (base.length > 5) {
          base = base.slice(0, 5);
        }
      }
      localStorage.setItem(
        {
          1: "SITE_SEARCH_HISTORY",
          2: "BUS_SEARCH_HISTORY",
        }[this.type],
        JSON.stringify(base)
      );
      this.getHistory();
    },
    handleSearch(val) {
      this.setHistory(val);
      setTimeout(() => (this.spinning = false), 500);
    },
  },
};
</script>
<style lang='scss' scoped>
.van-search {
  height: 1.3rem;
  .van-search__content {
    height: 0.8rem;
  }
  .van-cell {
    line-height: 0.6rem;
  }
}
.list-container {
  margin: 0.2rem 0;
  padding: 0 0.3rem;
  background: #fff;
  color: #333;
  > p {
    line-height: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 0.32rem;
  }
  .item {
    display: flex;
    align-items: center;
    height: 0.99rem;
    border-bottom: 1px solid #eee;
    font-size: 0.28rem;
    color: #333;
    > img {
      margin-right: 0.16rem;
      width: 0.26rem;
      height: 0.28rem;
    }
  }
  .clear {
    line-height: 0.8rem;
    height: 0.8rem;
    text-align: center;
    font-size: 0.24rem;
    color: #999;
    border: none;
  }
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.4rem;
  text-align: center;
  font-size: 0.28rem;
  color: #999;
  > img {
    width: 3.84rem;
    margin-bottom: 0.1rem;
  }
}
</style>