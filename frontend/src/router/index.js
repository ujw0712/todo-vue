import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/',           name: 'login',      component: () => import('@/views/login.vue'),      meta: { noAuth: true } },
  { path: '/login',      name: 'login',      component: () => import('@/views/login.vue'),      meta: { noAuth: true } },
  { path: '/join',       name: 'join',       component: () => import('@/views/join.vue'),       meta: { noAuth: true } },
  { path: '/dashboard',  name: 'dashboard',  component: () => import('@/views/dashboard.vue'),  meta: {  } },
  { path: '/mypage',     name: 'mypage',     component: () => import('@/views/mypage.vue'),     meta: {  } },
  { path: '/kanban',     name: 'kanban',     component: () => import('@/views/kanban.vue'),     meta: {  } },
  { path: '/board/list', name: 'board/list', component: () => import('@/views/board/list.vue'), meta: {  } },
  { path: '/board/new',  name: 'board/new',  component: () => import('@/views/board/save.vue'), meta: {  } },
  { path: '/board/:id',  name: 'board/:id',  component: () => import('@/views/board/save.vue'), meta: {  } },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('authToken')
  const needLogin = to.meta.noAuth ? false : true
  if (!isLogin && needLogin) {
    console.log('인증이 필요합니다')
    next('/login')
    return false
  }
  next()
})

export default router