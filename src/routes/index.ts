import { lazy } from 'react';
import UserManagement from '../pages/Dashboard/subAdmin/UserManagement';
import ManageLinks from '../pages/Dashboard/subAdmin/ManageLinks';
import PendingReq from '../pages/Dashboard/PendingReq';
import ManageSocials from '../pages/Socials/ManageSocial';
import Online from '../pages/Online/Online';
import UserView from '../pages/Userview/UserView';
import ShortnerList from '../pages/Dashboard/ShortnerList';
import HideInfoTable from '../components/tables/HideInfoTable';
import Blocked from '../components/Blocked';


 const Support =   lazy(() =>import('../components/Support'));
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
    path: '/blocked',
    title: 'Page Overview',
    component: Blocked,
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
  },
  {
    path: '/support',
    title: 'support',
    component: Support,
  }
];

const adminRoutes = [
  {
    path: '/users',
    title: 'users',
    component: UserManagement,
  },
  {
    path: '/hide-elements',
    title: 'information',
    component: HideInfoTable,
  },
  {
    path: '/online-users',
    title: 'Online Users',
    component: Online,
  },
  {
    path: '/shorter-request',
    title: 'Shorter Request',
    component: ShortnerList,
  },
  {
    path: '/users/view/:id',
    title: 'users',
    component: UserView,
  },
  {
    path: '/pending',
    title: 'pending',
    component: PendingReq,
  },

  {
    path: '/services',
    title: 'Manage Links',
    component: ManageSocials,
  },
  {
    path: '/manage_links',
    title: 'Manage Links',
    component: ManageLinks,
  },
  
];

const routes = [...coreRoutes,...adminRoutes];
export default routes;
