import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { CATEGORY_FORM_ID } from '@/shared/const/const';
import { useState } from 'react';
import { CategoryForm, categoryStore, createCategory, updateCategory } from '@/entities/category';
import { CategoryFormType } from '@/shared/types/category';

export const CategoryFormModal = observer(() => {
  const { isFormModalOpen, setIsFormModalOpen, formInitialState } = categoryStore;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onSubmit = async (data: CategoryFormType) => {
    setConfirmLoading(true);

    if (formInitialState) {
      await updateCategory({ ...formInitialState, ...data });
    } else {
      await createCategory(data);
    }

    setIsFormModalOpen(false);
    setConfirmLoading(false);
  };

  return (
    <Modal
      centered
      title={
        formInitialState && formInitialState.id ? `Изменить - ${formInitialState.name}` : 'Новая категория'
      }
      open={isFormModalOpen}
      confirmLoading={confirmLoading}
      onCancel={() => setIsFormModalOpen(false)}
      cancelText="Отменить"
      okText="Сохранить"
      okButtonProps={{
        htmlType: 'submit',
        form: CATEGORY_FORM_ID,
      }}
    >
      <CategoryForm initialState={formInitialState} onSubmit={onSubmit} />
    </Modal>
  );
});
