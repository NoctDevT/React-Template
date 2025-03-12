import  { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { UiLayout } from '../components/Layouts/UiLayout';
import { routes } from '../routes/index';
import { MotionWrapper } from '../components/MotionWrapper';

 const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' }, 
  // { label: 'Photography', path: '/photography' },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UiLayout links={navigationLinks} brandName='Autumn'>
        <MotionWrapper>
          <Outlet /> 
        </MotionWrapper>
      </UiLayout>
    ),
    children: routes,
  },
]);

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
