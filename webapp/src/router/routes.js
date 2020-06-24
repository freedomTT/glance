
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'hot', path: '', component: () => import('pages/Hot.vue') },
      { name: 'detail', path: '/detail/:text', component: () => import('pages/Detail.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
