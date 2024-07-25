import { Modal } from 'antd';
import {
  createMeasurementUnit,
  MeasurementUnitForm,
  measurementUnitStore,
  updateMeasurementUnit,
} from '@/entities/measurementUnit';
import { observer } from 'mobx-react-lite';
import { MEASUREMENT_UNIT_FORM_ID } from '@/shared/const/const';
import { useState } from 'react';
import { MeasurementUnit } from '@/shared/types/measurementUnit';

export const MeasurementUnitFormModal = observer(() => {
  const { isFormModalOpen, setIsFormModalOpen, formInitialState } = measurementUnitStore;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onSubmit = async (data: Omit<MeasurementUnit, 'id'>) => {
    setConfirmLoading(true);

    if (formInitialState) {
      await updateMeasurementUnit({ ...formInitialState, ...data });
    } else {
      await createMeasurementUnit(data);
    }

    setIsFormModalOpen(false);
    setConfirmLoading(false);
  };

  return (
    <Modal
      centered
      title={formInitialState ? `Изменить - ${formInitialState.name}` : 'Новая единица измерения'}
      open={isFormModalOpen}
      confirmLoading={confirmLoading}
      onCancel={() => setIsFormModalOpen(false)}
      cancelText="Отменить"
      okText="Сохранить"
      okButtonProps={{
        htmlType: 'submit',
        form: MEASUREMENT_UNIT_FORM_ID,
      }}
    >
      <MeasurementUnitForm initialState={formInitialState} onSubmit={onSubmit} />
    </Modal>
  );
});
