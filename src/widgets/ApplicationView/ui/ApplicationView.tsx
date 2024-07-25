import {
  Application,
  applicationEditStore,
  ProductsMatch,
  ProductsMatchList,
  UnregisteredProductList,
} from '@/entities/application';
import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { CommentList, CommentStore } from '@/entities/comment';
import { useRootStore } from '@/app/providers/StoreProvider';
import { UnregisteredProduct } from '@/shared/types/product';
import { ProductFormModal } from '@/widgets/ProductFormModal';

interface Props {
  id: Application['id'];
}

export const ApplicationView = observer(({ id }: Props) => {
  const {
    match,
    matches,
    application,
    unregisteredProducts,
    pushToMatches,
    setMatchProduct,
    setMatchUnregistred,
    deleteFromMatches,
    getApplicationById,
  } = applicationEditStore;
  const { applicationProductStore } = useRootStore();
  const [commentStore] = useState(() => new CommentStore(`posts`));

  useEffect(() => {
    if (id) {
      getApplicationById(id);
    }
  }, [id]);

  // @ts-ignore
  const onCreateProductFromUnregisteredClick = (unregisteredProduct: UnregisteredProduct) => {
    // TODO: CHANGE ON NORMAL BACKEND
    applicationProductStore.setFormInitialState({
      id: 1,
      name: 'Гвозди',
      category: 3,
      mark: 555,
      measurementUnit: 9999,
    });
    applicationProductStore.setIsFormModalOpen(true);
  };

  return (
    <>
      {application?.state !== 'fulfilled' ? (
        <div>Заявка загружается...</div>
      ) : (
        <>
          <ProductFormModal store={applicationProductStore} />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <UnregisteredProductList
                data={unregisteredProducts}
                onSelect={setMatchUnregistred}
                onCreate={onCreateProductFromUnregisteredClick}
              />
            </Col>
            <Col span={12}>
              <ProductsMatchList data={matches} onRemove={deleteFromMatches} />
            </Col>
            <Col span={12}>
              <ProductsMatch
                match={match}
                onMatch={pushToMatches}
                onDeleteProduct={setMatchProduct}
                onDeleteUnregistered={setMatchUnregistred}
              />
            </Col>{' '}
            <Col span={12}>
              <CommentList store={commentStore} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
});
