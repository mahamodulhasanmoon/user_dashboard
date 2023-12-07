import { lazy } from 'react';
 const Overview =   lazy(() =>import('../pages/Dashboard/Overview'));
const Conversation = lazy(() => import('../pages/Dashboard/Conversation'));
const Information = lazy(() => import('../pages/Dashboard/Information'));
const Shorter = lazy(() => import('../pages/Dashboard/Shorter'));
const WebLinks = lazy(() => import('../pages/Dashboard/WebLinks'));
const Notices = lazy(() => import('../pages/Dashboard/Notice'));

const coreRoutes = [
  {
    path: '/overview',
    title: 'Page Overview',
    component: Overview,
  },
  {
    path: '/conversion',
    title: 'Conversion',
    component: Conversation,
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
    title: 'Shorter',
    component: WebLinks,
  },
  {
    path: '/notices',
    title: 'Notices',
    component: Notices,
  }
];

const routes = [...coreRoutes];
export default routes;
