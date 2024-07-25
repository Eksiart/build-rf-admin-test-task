import { Navigate, RouteObject } from 'react-router-dom';
import { MainLayout } from '../../../layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import {
  getRouteCatalogManagement,
  getRouteCatalogManagementApplicationById,
  getRouteCatalogManagementApplications,
  getRouteCatalogManagementCatalog,
  getRouteCatalogManagementCategories,
  getRouteCatalogManagementMarks,
  getRouteCatalogManagementMeasurementUnits,
  getRouteDashboard,
  getRouteIndex,
  getRouteNotFound,
} from '@/shared/const/routes';
import {
  ApplicationPage,
  ApplicationsPage,
  CatalogPage,
  CategoriesPage,
  MarksPage,
  MeasurementUnitsPage,
} from '@/pages/CatalogManagment';

export const MainRoutes: RouteObject = {
  path: getRouteIndex(),
  element: <MainLayout />,
  children: [
    {
      path: getRouteIndex(),
      element: <Navigate to={getRouteDashboard()} replace />,
    },
    {
      path: getRouteDashboard(),
      element: <Dashboard />,
    },
    {
      path: getRouteCatalogManagement(),
      children: [
        {
          path: getRouteCatalogManagementApplications(),
          element: <ApplicationsPage />,
        },
        {
          path: getRouteCatalogManagementApplicationById(':applicationId'),
          element: <ApplicationPage />,
        },
        {
          path: getRouteCatalogManagementCatalog(),
          element: <CatalogPage />,
        },
        {
          path: getRouteCatalogManagementCategories(),
          element: <CategoriesPage />,
        },
        {
          path: getRouteCatalogManagementMarks(),
          element: <MarksPage />,
        },
        {
          path: getRouteCatalogManagementMeasurementUnits(),
          element: <MeasurementUnitsPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={getRouteNotFound()} replace />,
    },
  ],
};
