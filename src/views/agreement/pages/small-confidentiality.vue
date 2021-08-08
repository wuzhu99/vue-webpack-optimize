<!--
 * @Author: wuz
 * @Date: 2021-04-13 10:36:17
 * @LastEditTime: 2021-04-13 15:04:30
 * @FilePath: /h5-tzsmk/src/views/agreement/pages/small-confidentiality.vue
-->

<template>
  <div class="container">
    <h3>泰州市民卡APP账户小额免密协议</h3>
    <p>
      泰州市民卡APP账户快捷支付服务小额免密支付功能开通协议（以下简称“本协议”）是泰州市市民卡有限公司与中国银联就泰州市民卡线上平台手机APP快捷支付服务的小额免密支付功能（以下简称“本功能”）的使用等相关事项所订立的有效合约。用户通过协议页面勾选或以其他方式选择接受本协议，即表示用户与泰州市市民卡有限公司已达成协议并同意接受本协议的全部约定内容。
    </p>
    <p>
      在接受本协议之前，请您仔细阅读本协议的全部内容。如果您不同意本协议的任意内容，或者无法准确理解泰州市市民卡有限公司对条款的解释，请不要进行后续操作。
    </p>
    <p>
      根据本协议，泰州市市民卡有限公司将为您合法拥有的泰州市民卡APP账户在移动端（即无线设备，包括但不限于手机、便携式电脑等能够连接并使用WIFI、2G/3G网络等无线网络的电子设备）开通APP账户快捷支付服务的小额免密支付功能，并通过在个人中心开通/关闭按钮实现本功能的开/关。
    </p>
    <p>
      根据本协议开通本功能后，您在乘坐公交时，使用无线设备、通过无线网络向泰州市市民卡APP系统发送请求乘车码指令时，对于付款金额在300元人民币以下的小额支付，将无需输入密码或手机验证码，您点击确认或支付或类似的行为，即被视为您确认交易和交易金额，且该行为已不可撤销地向泰州市民卡APP发出指令，市民卡APP将根据该指令委托银行或第三方从您的银行卡中划扣资金给收款人。同时，您可以通过APP端的个人中心模块，为您的APP账户关闭或开通本功能，保证您的账户安全。
    </p>
    <p>
      当您选择开通本功能时，百付宝公司对于计算机系统按照收到的上述符合约定的支付指令完成支付的行为不承担任何责任，您需自行承担因自己管理百度钱包账户、登录密码、交易密码、无线终端等与支付有关的信息和设备不善所造成的后果。届时您不应以未在交易单据中签名、非本人意愿交易等原因要求百付宝公司退款或承担其他责任。
    </p>
    <p>
      当您关闭本功能时，您将无法通过本功能在移动端实现小额免密支付，也将无法使用乘车码功能。
    </p>
    <p>
      泰州市市民卡有限公司对于所有服务的后续改进升级，以及相关协议的修订，将在泰州市民卡官网或泰州市民卡APP的其他相关页面的显著位置上予以公示，不再另行单独通知。
    </p>
    <p>
      本协议作为泰州市民卡客户端用户服务协议的子协议，是对该协议的补充，泰州市民卡客户端用户服务协议没有约定或约定了但没有细化的内容，以本协议为准。
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background: #fff');
  },
  destroyed() {
    document.querySelector('body').setAttribute('style', '')
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.container {
  padding: 0.2rem 5%;
}

h3 {
  margin: 0.3rem 0;
  width: 100%;
  @include font(0.36rem, #333);
  font-weight: bold;
  text-align: center;
}

h4 {
  margin: 0.2rem 0 0.1rem;
  width: 100%;
  @include font(0.3rem, #333);
  font-weight: bold;
}

p {
  margin-bottom: 0.1rem;
  width: 100%;
  @include font(0.28rem, #333);
  line-height: 0.42rem;
}
</style>
