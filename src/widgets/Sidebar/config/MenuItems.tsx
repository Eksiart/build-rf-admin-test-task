import {
  getRouteCatalogManagement,
  getRouteCatalogManagementApplications,
  getRouteCatalogManagementCatalog,
  getRouteCatalogManagementCategories,
  getRouteCatalogManagementMarks,
  getRouteCatalogManagementMeasurementUnits,
  getRouteDashboard,
} from '@/shared/const/routes';
import { Link } from 'react-router-dom';
import { DashboardOutlined, ProductOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    key: getRouteDashboard(),
    label: <Link to={getRouteDashboard()}>Дашборд</Link>,
    icon: <DashboardOutlined style={{ fontSize: '16px' }} />,
  },
  {
    key: getRouteCatalogManagement(),
    label: 'Управление каталогом',
    icon: <ProductOutlined style={{ fontSize: '16px' }} />,
    children: [
      {
        key: getRouteCatalogManagementApplications(),
        label: <Link to={getRouteCatalogManagementApplications()}>Заявки на модерации</Link>,
        icon: <ProductOutlined style={{ fontSize: '16px' }} />,
      },
      {
        key: getRouteCatalogManagementCatalog(),
        label: <Link to={getRouteCatalogManagementCatalog()}>Каталог</Link>,
        icon: <ProductOutlined style={{ fontSize: '16px' }} />,
      },
      {
        key: getRouteCatalogManagementCategories(),
        label: <Link to={getRouteCatalogManagementCategories()}>Категории</Link>,
        icon: <ProductOutlined style={{ fontSize: '16px' }} />,
      },
      {
        key: getRouteCatalogManagementMarks(),
        label: <Link to={getRouteCatalogManagementMarks()}>Марки</Link>,
        icon: <ProductOutlined style={{ fontSize: '16px' }} />,
      },
      {
        key: getRouteCatalogManagementMeasurementUnits(),
        label: <Link to={getRouteCatalogManagementMeasurementUnits()}>Единицы измерения</Link>,
        icon: <ProductOutlined style={{ fontSize: '16px' }} />,
      },
    ],
  },
];
