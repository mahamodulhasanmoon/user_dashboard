import { lazy } from 'react';
 const Overview =   lazy(() =>import('../pages/Dashboard/Overview'));
const Information = lazy(() => import('../pages/Dashboard/Information'));
const Shorter = lazy(() => import('../pages/Dashboard/Shorter'));
const WebLinks = lazy(() => import('../pages/Dashboard/WebLinks'));
const Notices = lazy(() => import('../pages/Dashboard/Notice'));
const Settings = lazy(() => import('../pages/Dashboard/Settings'));

const coreRoutes = [
  {
    path: '/overview',
    title: 'Page Overview',
    component: Overview,
  },
  {
    path: '/information',
    title: 'information',
    component: Information,
  },
  {
    path: '/shorter',
    title: 'Shorter',
    component: Shorter,
  },
  {
    path: '/web_links',
    title: 'Web Links',
    component: WebLinks,
  },
  {
    path: '/notices',
    title: 'Notices',
    component: Notices,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Settings,
  }
];

const routes = [...coreRoutes];
export default routes;
