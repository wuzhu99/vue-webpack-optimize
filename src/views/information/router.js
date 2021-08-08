import Vue from 'vue'
import Router from 'vue-router'
import envBridge from '@/utils/env-bridge'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/information',
  routes: [
    {
      path: '/',
      redirect: '/help-list',
    },
    {
      path: '/help-list',
      name: 'help-list',
      component: () => import('./pages/help-list.vue'),
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('./pages/details.vue'),
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  envBridge._routerBefore(to, from, next)
})
export default router
