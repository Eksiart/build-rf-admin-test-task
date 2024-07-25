import { useParams } from 'react-router-dom';
import { PageTitle } from '@/shared/ui/PageTitle';
import { Button, Flex, Tooltip, Typography } from 'antd';
import { ProductFilters } from '@/widgets/ProductFilters';
import { ProductTable } from '@/widgets/ProductTable';
import { useRootStore } from '@/app/providers/StoreProvider';
import { SwapOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { ApplicationView } from '@/widgets/ApplicationView';
import { applicationEditStore } from '@/entities/application';
import { Product } from '@/shared/types/product';
import { ApproveApplicationButton } from '@/features/ApproveApplicationButton';

const mockProduct: Product = {
  id: 21,
  article: 'SB1231DE12E',
  name: 'Гвоздь финишный оцинкованный 1,8х40 100 г (99 шт)',
  mark: {
    id: 33,
    name: '1,8х40',
  },
  measurementUnit: {
    id: 44,
    name: 'Упаковка',
    symbol: 'уп.',
  },
  category: {
    id: 31,
    name: 'Гвозди',
  },
  quantityPerUnit: 99,
  width: 0.5,
  length: 0.5,
  height: 0.5,
  weight: 1,
  volume: 0.5,
};

const ApplicationPage = observer(() => {
  const params = useParams<{ applicationId: string }>();
  const { applicationProductStore } = useRootStore();
  const { setMatchProduct } = applicationEditStore;

  return (
    <Flex vertical gap={32}>
      <PageTitle
        disableMargin
        title={`Заявки на модерации - Заявка №${params.applicationId}`}
        action={<ApproveApplicationButton />}
      />
      <ApplicationView id={Number(params.applicationId!)} />
      <Flex vertical gap={10}>
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 0 }}>
          Каталог
        </Typography.Title>
        <ProductFilters store={applicationProductStore} />
        <ProductTable
          size="small"
          store={applicationProductStore}
          // TODO: Change mock product on real
          actions={(_) => (
            <Tooltip title="Изменить">
              <Button type="dashed" icon={<SwapOutlined />} onClick={() => setMatchProduct(mockProduct)}>
                Заменить
              </Button>
            </Tooltip>
          )}
        />
      </Flex>
    </Flex>
  );
});

export default ApplicationPage;
