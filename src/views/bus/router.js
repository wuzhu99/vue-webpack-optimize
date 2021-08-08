import Vue from 'vue'
import Router from 'vue-router'
import envBridge from '@/utils/env-bridge'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/bus',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('./pages/home'),
    },
    {
      path: '/search',
      component: () => import('./pages/search'),
      meta: {
        title: '站点查询',
      },
    },
    {
      path: '/site-list',
      component: () => import('./pages/site-list'),
      meta: {
        title: '公交查询',
      },
    },
    {
      path: '/site-details',
      component: () => import('./pages/site-details'),
      meta: {
        title: '掌上公交',
      },
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  envBridge._routerBefore(to, from, next)
})
export default router
