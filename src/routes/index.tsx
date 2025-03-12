import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import About from '../pages/About/index';
import Home from '../pages/Main/index'
import ErrorPage from '../pages/Error/index';

// Keep incase photography page uses full size images 
// const Photography = lazy(() => import('../pages/Photography')); 
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
    element: <Home/>
  }
  // {
  //   path: '*',
  //   element: <ErrorPage />,
  // },
];

