import { Image, Layout } from 'antd';
import Logo from '@/shared/assets/images/logo.png';

export const AppHeader = () => {
  return (
    <Layout.Header style={{ backgroundColor: 'white', padding: '0 16px' }}>
      <Image src={Logo} height={28} alt="Logo" preview={false} />
    </Layout.Header>
  );
};
