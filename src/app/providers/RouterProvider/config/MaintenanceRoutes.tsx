import { Navigate } from 'react-router-dom';
import { MainLayout } from '../../../layout/MainLayout';
import { NotFoundPage } from '@/pages/404';
import { getRouteNotFound } from '@/shared/const/routes';

export const MaintenanceRoutes = {
  path: '/maintenance',
  element: <MainLayout />,
  children: [
    { path: getRouteNotFound(), element: <NotFoundPage /> },
    {
      path: '*',
      element: <Navigate to={getRouteNotFound()} replace />,
    },
  ],
};
