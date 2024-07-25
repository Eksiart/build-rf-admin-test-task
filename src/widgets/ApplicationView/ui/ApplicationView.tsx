import {
  Application,
  applicationEditStore,
  ProductsMatch,
  ProductsMatchList,
  UnregisteredProductList,
} from '@/entities/application';
import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';

interface Props {
  id: Application['id'];
}

export const ApplicationView = observer(({ id }: Props) => {
  const {
    match,
    matches,
    application,
    unregistredProducts,
    pushToMatches,
    setMatchProduct,
    setMatchUnregistred,
    deleteFromMatches,
    getApplicationById,
  } = applicationEditStore;

  useEffect(() => {
    if (id) {
      getApplicationById(id);
    }
  }, [id]);

  return (
    <>
      {application?.state !== 'fulfilled' ? (
        <div>Заявка загружается...</div>
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UnregisteredProductList data={unregistredProducts} onSelect={setMatchUnregistred} />
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
            <div>CHAT</div>
          </Col>
        </Row>
      )}
    </>
  );
});
