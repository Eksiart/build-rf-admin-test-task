import { PageTitle } from '@/shared/ui/PageTitle';
import { Button, Flex, Tooltip } from 'antd';
import { ProductFilters } from '@/widgets/ProductFilters';
import { ProductTable } from '@/widgets/ProductTable';
import { observer } from 'mobx-react-lite';
import { ProductFormModal } from '@/widgets/ProductFormModal';
import { useRootStore } from '@/app/providers/StoreProvider';
import { EditOutlined } from '@ant-design/icons';
import { Product } from '@/shared/types/product';

const CatalogPage = observer(() => {
  const { catalogProductStore } = useRootStore();

  const onCreateProductClick = () => {
    catalogProductStore.setFormInitialState(undefined);
    catalogProductStore.setIsFormModalOpen(true);
  };

  const onEditProductClick = (product: Product) => {
    // TODO: CHANGE ON NORMAL BACKEND
    console.log(product);
    catalogProductStore.setFormInitialState({
      id: 1,
      name: 'Гвозди',
      article: '123',
      category: 3,
      mark: 555,
      measurementUnit: 9999,
      quantityPerUnit: 10,
      length: 10,
      width: 10,
      height: 10,
      weight: 10,
      volume: 10,
    });
    catalogProductStore.setIsFormModalOpen(true);
  };

  return (
    <>
      <PageTitle
        title="Каталог"
        action={
          <Button type="primary" size="large" onClick={onCreateProductClick}>
            Добавить продукт
          </Button>
        }
      />
      <Flex vertical gap={10}>
        <ProductFilters store={catalogProductStore} />
        <ProductTable
          store={catalogProductStore}
          actions={(product) => (
            <Tooltip title="Изменить">
              <Button
                type="link"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => onEditProductClick(product)}
              />
            </Tooltip>
          )}
        />
      </Flex>
      <ProductFormModal store={catalogProductStore} />
    </>
  );
});

export default CatalogPage;
