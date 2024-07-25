export const getRouteIndex = () => '/';
export const getRouteDashboard = () => '/dashboard';

// Catalog Management
export const getRouteCatalogManagement = () => '/catalog/management';
export const getRouteCatalogManagementApplications = () => '/catalog/management/applications';
export const getRouteCatalogManagementApplicationById = (id: number | string) =>
  `/catalog/management/applications/${id}`;
export const getRouteCatalogManagementCatalog = () => '/catalog/management/catalog';
export const getRouteCatalogManagementCategories = () => '/catalog/management/categories';
export const getRouteCatalogManagementMarks = () => '/catalog/management/marks';
export const getRouteCatalogManagementMeasurementUnits = () => `/catalog/management/measurement-units`;

// Maintenance
export const getRouteNotFound = () => '/maintenance/404';
