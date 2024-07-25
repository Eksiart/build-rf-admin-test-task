import { Card, CardProps, Flex, Skeleton, Typography } from 'antd';
import { Product, UnregisteredProduct } from '@/shared/types/product';

interface Props extends CardProps {
  product?: Product | UnregisteredProduct;
}

export const ProductCard = ({ title, product, ...otherProps }: Props) => {
  const renderTitle = () => {
    if (product) {
      return `${product.name} ${product.article ? `(${product.article})` : ''}`;
    }
    return <Skeleton />;
  };

  return (
    <Card loading={!product} size="small" title={title ?? renderTitle()} {...otherProps}>
      {product && (
        <Flex vertical gap={8}>
          <Typography.Text>Категория: {product.category.name}</Typography.Text>
          <Typography.Text>Марка: {product.mark.name}</Typography.Text>
          <Typography.Text>Единица измерения: {product.measurementUnit.name}</Typography.Text>
        </Flex>
      )}
    </Card>
  );
};
