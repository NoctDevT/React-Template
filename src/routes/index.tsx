import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Home from '../pages/Home/index';
import About from '../pages/Home/index'
import ErrorPage from '../pages/Error/index';

// Keep incase photography page uses full size images 
const Photography = lazy(() => import('../pages/Photography')); 

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/photography', 
    element: <Photography />,
  },
  {
    path: '/about', 
    element: <About />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

