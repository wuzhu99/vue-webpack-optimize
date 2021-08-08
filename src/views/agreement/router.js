import Vue from 'vue'
import Router from 'vue-router'
import envBridge from '@/utils/env-bridge'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '/agreement',
  routes: [
    {
      path: '/',
      redirect: '/privacy',
    },
    {
      path: '/privacy',
      component: () => import('./pages/privacy.vue'),
      meta: { title: '隐私协议' },
    },
    {
      path: '/small-confidentiality',
      component: () => import('./pages/small-confidentiality'),
      meta: { title: '小额免密协议' },
    },
    {
      path: '/user-service',
      component: () => import('./pages/user-service'),
      meta: { title: '用户服务协议' },
    },
    {
      path: '/pay-service',
      component: () => import('./pages/pay-service'),
      meta: { title: '快捷支付服务协议' },
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  envBridge._routerBefore(to, from, next)
})

export default router
