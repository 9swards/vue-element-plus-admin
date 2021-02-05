import { AppRouteModule } from '@/routers/types';
import Layout from '@/layout/index.vue';
export const basicRoutes: AppRouteModule[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login',
      ignoreAuth: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      title: 'Home',
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'dashboard',
        },
      },
    ],
  },
];

export const basicRouteNames = basicRoutes.map((item) => item.name);
