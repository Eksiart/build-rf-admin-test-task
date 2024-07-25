import { Button, List, Typography } from 'antd';
import { UnregisteredProduct } from '@/shared/types/product';

interface Props {
  data: UnregisteredProduct[];
  onSelect?: (uProduct: UnregisteredProduct) => void;
  onCreate?: (uProduct: UnregisteredProduct) => void;
}

export const UnregisteredProductList = ({ data, onSelect, onCreate }: Props) => {
  return (
    <List
      style={{
        height: 400,
      }}
      header={
        <Typography.Title level={4} style={{ margin: 0 }}>
          {`Незарегистрированные продукты (${data.length})`}
        </Typography.Title>
      }
      bordered
      dataSource={data}
      renderItem={(uProduct) => (
        <List.Item
          key={uProduct.id}
          actions={[
            <Button
              type="link"
              disabled={!onSelect}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(uProduct);
              }}
            >
              Выбрать
            </Button>,
            <Button
              type="link"
              disabled={!onCreate}
              onClick={(e) => {
                e.stopPropagation();
                onCreate?.(uProduct);
              }}
            >
              Создать
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={
              <Typography.Text>
                {uProduct.name} {uProduct.category.name} {uProduct.mark.name} {uProduct.measurementUnit.name}
              </Typography.Text>
            }
          />
        </List.Item>
      )}
    />
  );
};
