import { Button, List, Typography } from 'antd';
import { ProductsMatch } from '../model/types/productsMatch';

interface Props {
  data: ProductsMatch[];
  onRemove?: (id: ProductsMatch['id']) => void;
}

export const ProductsMatchList = ({ data, onRemove }: Props) => {
  return (
    <List
      style={{
        height: 400,
      }}
      header={
        <Typography.Title level={4} style={{ margin: 0 }}>
          {`Сопоставленные продукты (${data.length})`}
        </Typography.Title>
      }
      bordered
      dataSource={data}
      renderItem={(match) => (
        <List.Item
          key={match.id}
          actions={[
            <Button
              type="link"
              disabled={!onRemove}
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(match.id);
              }}
            >
              Убрать
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={
              <Typography.Text>
                {match.target.name} {match.target.category.name} {match.target.mark.name}{' '}
                {match.target.measurementUnit.name}
              </Typography.Text>
            }
            description={
              <Typography.Text>
                {match.source.name} {match.source.category.name} {match.source.mark.name}{' '}
                {match.source.measurementUnit.name}
              </Typography.Text>
            }
          />
        </List.Item>
      )}
    />
  );
};
