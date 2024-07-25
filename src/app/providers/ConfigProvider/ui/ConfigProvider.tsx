import { ConfigProvider as AntdConfigProvider } from 'antd';
import { defaultThemeConfig } from '../config/defaultThemeConfig';

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <AntdConfigProvider theme={defaultThemeConfig}>{children}</AntdConfigProvider>;
};
