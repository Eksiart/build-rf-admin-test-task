import { Button } from 'antd';
import { markStore } from '@/entities/mark';
import { observer } from 'mobx-react-lite';

export const AddMarkButton = observer(() => {
  const { setFormInitialState, setIsFormModalOpen } = markStore;

  const onClick = () => {
    setFormInitialState(undefined);
    setIsFormModalOpen(true);
  };

  return (
    <Button type="primary" size="large" onClick={onClick}>
      Добавить марку
    </Button>
  );
});
