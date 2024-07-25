import { useRoutes } from 'react-router-dom';
import { MainRoutes } from '../config/MainRoutes';
import { MaintenanceRoutes } from '../config/MaintenanceRoutes';

export const RouterProvider = () => {
  return useRoutes([MainRoutes, MaintenanceRoutes]);
};
