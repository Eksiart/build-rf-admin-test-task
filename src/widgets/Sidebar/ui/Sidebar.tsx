import { Layout, Menu } from 'antd';
import { menuItems } from '../config/MenuItems';
import { usePathname } from '@/shared/hooks/usePathname';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Layout.Sider trigger={null} style={{ backgroundColor: 'white' }} width={250}>
      <Menu mode="inline" items={menuItems} selectable selectedKeys={[pathname]} />
    </Layout.Sider>
  );
};
