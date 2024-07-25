import { Form, Input, message } from 'antd';
import { MeasurementUnit } from '@/shared/types/measurementUnit';
import { MEASUREMENT_UNIT_FORM_ID } from '@/shared/const/const';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';

type MeasurementUnitFormType = Omit<MeasurementUnit, 'id'>;

type Props = {
  initialState?: MeasurementUnit;
  onSubmit?: (data: MeasurementUnitFormType) => void;
};

export const MeasurementUnitForm = ({ initialState, onSubmit }: Props) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [form, initialState]);

  const onFinish = async (data: MeasurementUnitFormType) => {
    messageApi.open({
      key: MEASUREMENT_UNIT_FORM_ID,
      type: 'loading',
      content: 'Сохранение...',
      duration: 0,
    });
    try {
      await onSubmit?.(data);
      messageApi.open({
        key: MEASUREMENT_UNIT_FORM_ID,
        type: 'success',
        content: 'Единица измерения сохранена',
      });
    } catch (e) {
      messageApi.open({
        key: MEASUREMENT_UNIT_FORM_ID,
        type: 'error',
        content: 'Не удалось сохранить единицу измерения',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        id={MEASUREMENT_UNIT_FORM_ID}
        autoComplete="off"
        initialValues={initialState}
        onFinish={onFinish}
      >
        <Form.Item<MeasurementUnitFormType>
          name="name"
          label="Название"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', min: 3, message: 'Минимум 3 символа' },
          ]}
        >
          <Input placeholder="Кубический метр" />
        </Form.Item>
        <Form.Item<MeasurementUnitFormType>
          name="symbol"
          label="Символ"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', max: 3, message: 'Максимум 3 символа' },
          ]}
        >
          <Input placeholder="м3" />
        </Form.Item>
      </Form>
    </>
  );
};
