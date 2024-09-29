import {createRouter, createWebHistory, type RouteRecordRaw, RouterView} from 'vue-router'
import {Dashboard, BrowserCheck} from '@vicons/tabler'
import {IdManagement, CicsSystemGroup, Finance, Report, Development} from '@vicons/carbon'
import {loadRoutes} from "@/router/routeLoader";
import {reloadLoginInfo, verifyLogin} from "@/api/authApi";

const constantRoute = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    meta: {title: '首页'},
    redirect: '/dashboard',
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {title: '登录'}
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFound.vue'),
    meta: {title: '404'}
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoute as RouteRecordRaw[]
});
const isLogin = (await verifyLogin()).data;
if(isLogin) {
  const menuList = (await reloadLoginInfo()).data.menuList;
  await loadRoutes(menuList);
}else {
  await router.push({name: 'Login'});
}
router.beforeEach(async (to, from, next) => {
  const routes = router.getRoutes();
  const exist = routes.some(route => route.path === to.path);
  if (!exist) {
    next({ name: 'NotFound' });
  } else {
    next();
  }
});