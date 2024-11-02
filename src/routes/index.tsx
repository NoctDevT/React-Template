import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home/index'));
const About = lazy(() => import('../pages/About/index'));
const Photography = lazy(() => import('../pages/Photography/index')); // Ensure file path matches
const ErrorPage = lazy(() => import('../pages/Error/index'));

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

export const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' }, 
  { label: 'Photography', path: '/photography' },
];
