import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { UiLayout } from '../components/ui/UiLayout';
import { routes, navigationLinks } from '../routes/index';
import { MotionWrapper } from '../components/MotionWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UiLayout links={navigationLinks}>
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
