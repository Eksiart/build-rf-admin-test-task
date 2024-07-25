import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

interface Props {
  onClick: () => void;
}

export const EditButton = ({ onClick }: Props) => {
  return (
    <Tooltip title="Изменить">
      <Button type="link" shape="circle" icon={<EditOutlined />} onClick={onClick} />
    </Tooltip>
  );
};
