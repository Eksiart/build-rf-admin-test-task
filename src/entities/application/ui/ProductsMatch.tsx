import { Button, Col, Flex, Row, Typography } from 'antd';
import { ProductsMatch as ProductsMatchType } from '../model/types/productsMatch';
import { ProductCard } from '@/entities/product';
import { observer } from 'mobx-react-lite';

interface Props {
  match: Partial<ProductsMatchType>;
  onMatch: () => void;
  onDeleteProduct: () => void;
  onDeleteUnregistered: () => void;
}

export const ProductsMatch = observer(({ match, onMatch, onDeleteProduct, onDeleteUnregistered }: Props) => {
  const { target: product, source: unregistered } = match;
  return (
    <Flex vertical gap={10}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Сопоставление продуктов
      </Typography.Title>
      <Row gutter={18}>
        <Col span={12}>
          <ProductCard
            product={unregistered}
            title={
              unregistered
                ? `Незарегистрированный продукт: ${unregistered.name}`
                : 'ВЫБЕРИТЕ НЕЗАРЕГИСТРИРОВАННЫЙ ПРОДУКТ'
            }
            extra={
              <Button disabled={!unregistered} type="link" onClick={onDeleteUnregistered}>
                Убрать
              </Button>
            }
          />
        </Col>
        <Col span={12}>
          <ProductCard
            product={product}
            title={
              product ? `Продукт: ${product.name} (${product.article})` : 'ВЫБЕРИТЕ CУЩЕСТВУЮЩИЙ ПРОДУКТ'
            }
            extra={
              <Button disabled={!product} type="link" onClick={onDeleteProduct}>
                Убрать
              </Button>
            }
          />
        </Col>
      </Row>
      <Button
        disabled={!product || !unregistered}
        title="Сопоставить"
        type="primary"
        size="large"
        onClick={onMatch}
      >
        Сопоставить
      </Button>
    </Flex>
  );
});
