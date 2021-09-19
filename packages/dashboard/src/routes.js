import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import GroupList from './pages/GroupList';
import AccountList from './pages/AccountList';
import UserList from './pages/UserList';
import AccountRegistration from './pages/AccountRegistration';
import { PermissionEnum } from './models/user';
// import PermissionDenied from './pages/PermissionDenied';

const superUserRoutes = [
  { path: 'account', element: <Account /> },
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'accounts', element: <AccountList /> },
  { path: 'users', element: <UserList /> },
  { path: 'groups', element: <GroupList /> },
  { path: 'settings', element: <Settings /> },
];
const accountAdminRoutes = [
  { path: 'account', element: <Account /> },
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'groups', element: <GroupList /> },
  { path: 'settings', element: <Settings /> },
];
const groupAdminRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'groups', element: <GroupList /> },
];

const routes = (currentUser) => {
  let adminRouteChildren = groupAdminRoutes;
  if (currentUser) {
    if (currentUser.permission === PermissionEnum.SUPER_USER) {
      adminRouteChildren = superUserRoutes;
    } else if (currentUser.permission === PermissionEnum.ACCOUNT_ADMIN) {
      adminRouteChildren = accountAdminRoutes;
    }
  }

  return [
    {
      path: 'admin',
      element: (currentUser) ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        ...adminRouteChildren,
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register/:uid', element: <Register /> },
        { path: 'register', element: <AccountRegistration /> },
        { path: '404', element: <NotFound /> },
        // { path: 'unauthorized', element: <PermissionDenied /> },
        { path: '/', element: <Navigate to="/admin/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ];
};
export default routes;
