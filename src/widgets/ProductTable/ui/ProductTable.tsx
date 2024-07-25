import { observer } from 'mobx-react-lite';
import { ProductStore } from '@/entities/product';
import { Table, TableProps } from 'antd';
import { ReactNode, useEffect, useMemo } from 'react';
import { Product } from '@/shared/types/product';

interface Props {
  size?: TableProps<Product>['size'];
  store: ProductStore;
  actions?: (record: Product) => ReactNode;
}

export const ProductTable = observer(({ size, store, actions }: Props) => {
  const { productRequest, getProductList, productFilters, setProductFiltersAndRefetchProducts } = store;

  useEffect(() => {
    getProductList();
  }, []);

  const tableColumns: TableProps<Product>['columns'] = useMemo(() => {
    const columns: TableProps<Product>['columns'] = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Название',
        key: 'name',
        render: () => 'Гвозди в упаковке 1000 шт.',
      },
      {
        title: 'Артикул',
        key: 'article',
        render: () => '984EB5465AS',
      },
      {
        title: 'Категория',
        key: 'category',
        render: () => 'Фурнитура',
      },
      {
        title: 'Марка',
        key: 'mark',
        render: () => '2,5х50',
      },
      {
        title: 'Ед. изм.',
        key: 'measurementUnit',
        render: () => 'Упак.',
      },
      {
        title: 'Кол-во в упаковке',
        key: 'quantityPerUnit',
        render: () => '1000',
      },
    ];

    if (actions) {
      columns.push({
        title: 'Действия',
        key: 'actions',
        render: (_: any, record: Product) => actions(record),
      });
    }

    return columns;
  }, []);

  if (productRequest.state === 'rejected') return <div>Error</div>;

  const productResponse =
    productRequest.state === 'fulfilled' ? productRequest.value : { products: [], total: 0 };

  return (
    <Table
      size={size}
      rowKey="id"
      columns={tableColumns}
      dataSource={productResponse.products}
      loading={productRequest?.state === 'pending'}
      pagination={{
        total: productResponse.total,
        position: ['bottomLeft'],
        current: productFilters.page,
        pageSize: productFilters.limit,
        onChange: (page, limit) => setProductFiltersAndRefetchProducts({ ...productFilters, page, limit }),
      }}
    />
  );
});
