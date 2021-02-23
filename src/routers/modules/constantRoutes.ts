import { useI18n } from '/@/hooks/useI18n';

const { t } = useI18n();
export const constantRoutes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: t('common.okText'),
    },
  },
  {
    path: '/login',
    component: () => import('/@/views/login'),
    hidden: true,
  },
];

export default constantRoutes;
