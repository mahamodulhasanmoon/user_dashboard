import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));

const coreRoutes = [
  {
    path: '/conversion',
    title: 'Conversion',
    component: Calendar,
  }
];

const routes = [...coreRoutes];
export default routes;
