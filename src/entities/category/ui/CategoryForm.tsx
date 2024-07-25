import { Form, Input, message } from 'antd';
import { CategoryFormType } from '@/shared/types/category';
import { CATEGORY_FORM_ID } from '@/shared/const/const';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

type Props = {
  initialState?: CategoryFormType;
  onSubmit?: (data: CategoryFormType) => void;
};

export const CategoryForm = ({ initialState, onSubmit }: Props) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [form, initialState]);

  const onFinish = async (data: CategoryFormType) => {
    messageApi.open({
      key: CATEGORY_FORM_ID,
      type: 'loading',
      content: 'Сохранение...',
      duration: 0,
    });
    try {
      await onSubmit?.(data);
      messageApi.open({
        key: CATEGORY_FORM_ID,
        type: 'success',
        content: 'Категория сохранена',
      });
    } catch (e) {
      messageApi.open({
        key: CATEGORY_FORM_ID,
        type: 'error',
        content: 'Не удалось сохранить категорию',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        id={CATEGORY_FORM_ID}
        autoComplete="off"
        initialValues={initialState}
        onFinish={onFinish}
      >
        <Form.Item<CategoryFormType>
          name="name"
          label="Название"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', min: 3, message: 'Минимум 3 символа' },
          ]}
        >
          <Input placeholder="Алюминиевые изделия" />
        </Form.Item>
      </Form>
    </>
  );
};
