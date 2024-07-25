import { Form, Input, message } from 'antd';
import { Mark } from '@/shared/types/mark';
import { MARK_FORM_ID } from '@/shared/const/const';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

type MarkFormType = Omit<Mark, 'id'>;

type Props = {
  initialState?: Mark;
  onSubmit?: (data: MarkFormType) => void;
};

export const MarkForm = ({ initialState, onSubmit }: Props) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [form, initialState]);

  const onFinish = async (data: MarkFormType) => {
    messageApi.open({
      key: MARK_FORM_ID,
      type: 'loading',
      content: 'Сохранение...',
      duration: 0,
    });
    try {
      await onSubmit?.(data);
      messageApi.open({
        key: MARK_FORM_ID,
        type: 'success',
        content: 'Марка сохранена',
      });
    } catch (e) {
      messageApi.open({
        key: MARK_FORM_ID,
        type: 'error',
        content: 'Не удалось сохранить марку',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} id={MARK_FORM_ID} autoComplete="off" initialValues={initialState} onFinish={onFinish}>
        <Form.Item<MarkFormType>
          name="name"
          label="Название"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', min: 3, message: 'Минимум 3 символа' },
          ]}
        >
          <Input placeholder="300 BRT" />
        </Form.Item>
      </Form>
    </>
  );
};
