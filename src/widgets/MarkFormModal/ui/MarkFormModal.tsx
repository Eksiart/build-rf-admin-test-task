import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { MARK_FORM_ID } from '@/shared/const/const';
import { useState } from 'react';
import { createMark, MarkForm, markStore, updateMark } from '@/entities/mark';
import { Mark } from '@/shared/types/mark';

export const MarkFormModal = observer(() => {
  const { isFormModalOpen, setIsFormModalOpen, formInitialState } = markStore;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onSubmit = async (data: Omit<Mark, 'id'>) => {
    setConfirmLoading(true);

    if (formInitialState) {
      await updateMark({ ...formInitialState, ...data });
    } else {
      await createMark(data);
    }

    setIsFormModalOpen(false);
    setConfirmLoading(false);
  };

  return (
    <Modal
      centered
      title={formInitialState ? `Изменить - ${formInitialState.name}` : 'Новая марка'}
      open={isFormModalOpen}
      confirmLoading={confirmLoading}
      onCancel={() => setIsFormModalOpen(false)}
      cancelText="Отменить"
      okText="Сохранить"
      okButtonProps={{
        htmlType: 'submit',
        form: MARK_FORM_ID,
      }}
    >
      <MarkForm initialState={formInitialState} onSubmit={onSubmit} />
    </Modal>
  );
});
