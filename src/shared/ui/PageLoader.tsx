import { Flex, Spin } from 'antd';

export const PageLoader = () => {
  return (
    <Flex style={{ height: '80%' }} justify="center" align="center">
      <Spin size="large" />
    </Flex>
  );
};
