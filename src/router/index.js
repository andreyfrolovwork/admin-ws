import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'main-page' } },
    {
      path: '/main2',
      name: 'main-page2',
      component: () => import('@/views/dashboard/ecommerce/Ecommerce-copy2.vue'),
    },
    {
      path: '/main',
      name: 'main-page',
      component: () => import('@/views/dashboard/ecommerce/Ecommerce-copy.vue'),
    },
    {
      path: '/users',
      name: 'users-page',
      component: () => import('@/pages/UsersPage.vue'),
    },
    {
      path: '/matches',
      name: 'matches-page',
      component: () => import('@/pages/MatchList.vue'),
    },
    {
      path: '/reports',
      name: 'reports-page',
      component: () => import('@/pages/ReportListPage.vue'),
    },
    {
      path: '/orders',
      name: 'orders-page',
      component: () => import('@/pages/OrderListPage.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks-page',
      component: () => import('@/pages/TasksPage.vue'),
    },
    {
      path: '/tasks-static',
      name: 'tasks-static',
      component: () => import('@/pages/StaticTasksPage.vue'),
    },
    {
      path: '/tasks-dynamic',
      name: 'tasks-dynamic',
      component: () => import('@/pages/DynamicTasksPage.vue'),
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'read',
      },
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/pages/authentication/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

/*router.beforeEach((to, from, next) => {
  console.log(store)
  if (!store.state.appData.isAuth) {
    if (to.fullPath === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})*/

export default router
