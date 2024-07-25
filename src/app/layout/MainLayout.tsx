import { Layout } from 'antd';
import { Sidebar } from '@/widgets/Sidebar';
import { AppHeader } from '@/widgets/AppHeader';
import { PageLoader } from '@/shared/ui/PageLoader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout>
        <Sidebar />
        <Layout.Content style={{ padding: '12px' }}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
