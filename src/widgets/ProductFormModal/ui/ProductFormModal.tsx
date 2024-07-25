import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { PRODUCT_FORM_ID } from '@/shared/const/const';
import { useEffect, useState } from 'react';
import { createProduct, ProductForm, ProductStore, updateProduct } from '@/entities/product';
import { ProductFormType } from '@/shared/types/product';
import { markStore } from '@/entities/mark';
import { categoryStore } from '@/entities/category';
import { measurementUnitStore } from '@/entities/measurementUnit';

interface Props {
  store: ProductStore;
}

export const ProductFormModal = observer(({ store }: Props) => {
  const { isFormModalOpen, setIsFormModalOpen, formInitialState } = store;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { markRequest, getMarksList } = markStore;
  const { categories, getCategoriesList } = categoryStore;
  const { measurementUnitsRequest, getMeasurementUnitsList } = measurementUnitStore;

  useEffect(() => {
    if (isFormModalOpen) {
      getMarksList();
      getCategoriesList();
      getMeasurementUnitsList();
    }
  }, [isFormModalOpen]);

  const onSubmit = async (data: ProductFormType) => {
    setConfirmLoading(true);

    if (formInitialState) {
      await updateProduct({ ...formInitialState, ...data });
    } else {
      await createProduct(data);
    }

    setIsFormModalOpen(false);
    setConfirmLoading(false);
  };

  const onModalClose = () => {
    setIsFormModalOpen(false);
  };

  return (
    <Modal
      centered
      title={formInitialState ? `Изменить - ${formInitialState.name}` : 'Новый товар'}
      open={isFormModalOpen}
      confirmLoading={confirmLoading}
      onCancel={onModalClose}
      cancelText="Отменить"
      okText="Сохранить"
      okButtonProps={{
        htmlType: 'submit',
        form: PRODUCT_FORM_ID,
      }}
    >
      {markRequest.state === 'fulfilled' &&
      categories?.state === 'fulfilled' &&
      measurementUnitsRequest.state === 'fulfilled' ? (
        <ProductForm
          initialState={formInitialState}
          onSubmit={onSubmit}
          categories={categories.value}
          marks={markRequest.value.marks}
          measurementUnits={measurementUnitsRequest.value.measurementUnits}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
});
