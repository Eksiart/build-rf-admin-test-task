import { Button } from 'antd';
import { measurementUnitStore } from '@/entities/measurementUnit';
import { observer } from 'mobx-react-lite';

export const AddMeasurementUnitButton = observer(() => {
  const { setFormInitialState, setIsFormModalOpen } = measurementUnitStore;

  const onClick = () => {
    setFormInitialState(undefined);
    setIsFormModalOpen(true);
  };

  return (
    <Button type="primary" size="large" onClick={onClick}>
      Добавить единицу измерения
    </Button>
  );
});
