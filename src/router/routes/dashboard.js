export default [
  /* {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },*/
  {
    path: '/main',
    name: 'main-page',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce-copy.vue'),
  },
  {
    path: '/users',
    name: 'users-page',
    component: () => import('@/views/apps/user/users-list/UsersList-copy.vue'),
  },
  {
    path: '/matches',
    name: 'matches-page',
    component: () =>
      import('@/views/apps/user/users-list/matches-list/MatchesList.vue'),
  },
  {
    path: '/reports',
    name: 'reports-page',
    component: () =>
      import('@/views/apps/user/users-list/reports-list/ReportsList.vue'),
  },
  {
    path: '/orders',
    name: 'orders-page',
    component: () =>
      import('@/views/apps/user/users-list/orders-list/OrdersList.vue'),
  },
  {
    path: '/tasks',
    name: 'tasks-page',
    component: () =>
      import('@/views/apps/user/users-list/tasks-list/TasksList.vue'),
  },
]
