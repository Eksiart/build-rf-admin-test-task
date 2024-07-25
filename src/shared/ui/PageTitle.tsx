import { Flex, Typography } from 'antd';
import { ReactNode } from 'react';
import { TitleProps } from 'antd/es/typography/Title';

interface Props {
  title?: string;
  action?: ReactNode;
  level?: TitleProps['level'];
  disableMargin?: boolean;
}

export const PageTitle = ({ title, action = null, level = 2, disableMargin = false }: Props) => {
  return (
    <Flex justify="space-between" align="center" style={disableMargin ? {} : { marginBottom: 15 }}>
      {title && (
        <Typography.Title level={level} style={{ marginTop: 0, marginBottom: 0 }}>
          {title}
        </Typography.Title>
      )}
      {action}
    </Flex>
  );
};
