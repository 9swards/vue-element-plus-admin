import { AppRouteModule } from '@/routers/types';

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
];

export const basicRouteNames = basicRoutes.map((item) => item.name);
