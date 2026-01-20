import DataPortfolio from '@/data/dataPortfolio';
import LayoutPage from '@/layouts/layoutPage';
import Main from '@/pages';
import Settings from '@/pages/comm/Settings';
import Dashboard from '@/pages/dashboard/Dashboard';
import Portfolio from '@/pages/history/portfolio';
import BoardList from '@/pages/board/List';
import BoardView from '@/pages/board/View';
import BoardWrite from '@/pages/board/Write';
import AlarmPage from '@/pages/sub/alarm';
import Components from '@/pages/sub/components';
import { Route, Routes } from 'react-router-dom';

// layout ...

const routes = [
  {
    // ################################################################
    // ############################  index
    // ################################################################
    path: '/',
    element: <Main />,
  },

  // ################################################################
  // #######  sub
  // ################################################################
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/components',
    element: <Components />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/alarm',
    element: <AlarmPage />,
  },
  // ################################################################
  // #######  data View
  // ################################################################
  {
    path: '/data-portfolio',
    element: <DataPortfolio />,
  },
  {
    path: '/history/portfolio',
    element: <Portfolio />,
  },
  {
    path: '/board',
    element: <BoardList />,
  },
  {
    path: '/board/write',
    element: <BoardWrite />,
  },
  {
    path: '/board/:id',
    element: <BoardView />,
  },
  {
    path: '/board/:id/edit',
    element: <BoardWrite />,
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutPage />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
