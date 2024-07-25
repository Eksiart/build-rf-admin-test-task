import { Cascader, Form, Input, InputNumber, message, Select } from 'antd';
import { PRODUCT_FORM_ID } from '@/shared/const/const';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { ProductFormType } from '@/shared/types/product';
import { Mark } from '@/shared/types/mark';
import { Category } from '@/shared/types/category';
import { MeasurementUnit } from '@/shared/types/measurementUnit';

type Props = {
  initialState?: ProductFormType;
  onSubmit?: (data: ProductFormType) => void;
  categories: Category[];
  marks: Mark[];
  measurementUnits: MeasurementUnit[];
};

export const ProductForm = ({ initialState, onSubmit, categories, marks, measurementUnits }: Props) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [form, initialState]);

  const onFinish = async (data: ProductFormType) => {
    messageApi.open({
      key: PRODUCT_FORM_ID,
      type: 'loading',
      content: 'Сохранение...',
      duration: 0,
    });
    try {
      await onSubmit?.(data);
      messageApi.open({
        key: PRODUCT_FORM_ID,
        type: 'success',
        content: 'Продукт сохранен',
      });
    } catch (e) {
      messageApi.open({
        key: PRODUCT_FORM_ID,
        type: 'error',
        content: 'Не удалось сохранить продукт',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        id={PRODUCT_FORM_ID}
        autoComplete="off"
        initialValues={initialState}
        onFinish={onFinish}
      >
        <Form.Item<ProductFormType>
          name="category"
          label="Категория"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Cascader
            style={{ width: '100%' }}
            showSearch
            fieldNames={{ label: 'name', value: 'id' }}
            options={categories}
            placeholder="Выберите категорию товара"
          />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="name"
          label="Название"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', min: 3, message: 'Минимум 3 символа' },
            { type: 'string', max: 255, message: 'Максимум 255 символов' },
          ]}
        >
          <Input placeholder="Ящик гвоздей" />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="article"
          label="Артикул"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            { type: 'string', min: 3, message: 'Минимум 3 символа' },
            { type: 'string', max: 255, message: 'Максимум 255 символов' },
          ]}
        >
          <Input placeholder="Ящик гвоздей" />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="mark"
          label="Марка"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Select
            placeholder="Выберите марку товара"
            allowClear
            // TODO: use name instead of title on real backend. This only for PREVIEW
            fieldNames={{ label: 'title', value: 'id' }}
            options={marks}
          />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="measurementUnit"
          label="Единица измерения"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Select
            placeholder="Выберите единицу измерения товара"
            allowClear
            // TODO: use name instead of title on real backend. This only for PREVIEW
            fieldNames={{ label: 'title', value: 'id' }}
            options={measurementUnits}
          />
        </Form.Item>

        <Form.Item<ProductFormType>
          name="quantityPerUnit"
          label="Количество на единицу товара"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <InputNumber placeholder="1" addonAfter="шт." decimalSeparator=" " />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="length"
          label="Длина"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <InputNumber placeholder="1" addonAfter="м" decimalSeparator=" " />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="width"
          label="Ширина"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <InputNumber placeholder="1" addonAfter="м" decimalSeparator=" " />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="height"
          label="Высота"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <InputNumber placeholder="1" addonAfter="м" decimalSeparator=" " />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="volume"
          label="Объем"
          required
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <InputNumber placeholder="1" addonAfter="м3" decimalSeparator=" " />
        </Form.Item>
        <Form.Item<ProductFormType>
          name="weight"
          label="Вес"
          required
          validateTrigger="onBlur"
          rules={[
            { required: true, message: 'Обязательное поле' },
            (_) => ({
              validator(_, value) {
                if (value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Значение должно быть больше 0'));
              },
            }),
          ]}
        >
          <InputNumber placeholder="1" addonAfter="кг" decimalSeparator=" " />
        </Form.Item>
      </Form>
    </>
  );
};
