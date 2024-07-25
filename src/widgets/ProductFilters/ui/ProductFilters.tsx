import { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductStore } from '@/entities/product';
import { Alert, Cascader, Col, Flex, Input, Row, Select, Typography } from 'antd';
import { measurementUnitStore } from '@/entities/measurementUnit';
import { markStore } from '@/entities/mark';
import { categoryStore } from '@/entities/category';
import { Category } from '@/shared/types/category';
import { Mark } from '@/shared/types/mark';
import { MeasurementUnit } from '@/shared/types/measurementUnit';
import debounce from 'lodash.debounce';

interface Props {
  store: ProductStore;
}

export const ProductFilters = observer(
  ({ store: { productFilters, setProductFiltersAndRefetchProducts } }: Props) => {
    const { markRequest, getMarksList } = markStore;
    const { categories, getCategoriesList } = categoryStore;
    const { measurementUnitsRequest, getMeasurementUnitsList } = measurementUnitStore;

    useEffect(() => {
      getMarksList();
      getCategoriesList();
      getMeasurementUnitsList();
    }, []);

    const onSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
      setProductFiltersAndRefetchProducts({ ...productFilters, search: e.target.value });
    }, 500);

    const onCategoriesChange = debounce((selectedCategories: Category['id'][][]) => {
      setProductFiltersAndRefetchProducts({
        ...productFilters,
        categoryIds: selectedCategories.flat(),
      });
    }, 500);

    const onMarksChange = debounce((selectedMarks: Mark['id'][]) => {
      setProductFiltersAndRefetchProducts({ ...productFilters, markIds: selectedMarks });
    }, 500);

    const onMeasurementUnitsChange = debounce((selectedMeasurementUnits: MeasurementUnit['id'][]) => {
      setProductFiltersAndRefetchProducts({
        ...productFilters,
        measurementUnitIds: selectedMeasurementUnits,
      });
    }, 500);

    return (
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Flex vertical>
            <Typography.Text strong>Поиск</Typography.Text>
            <Input.Search
              onChange={onSearchChange}
              placeholder="Поиск по названию, идентификатору, артикулу..."
            />
          </Flex>
        </Col>
        <Col span={8}>
          <Flex vertical>
            <Typography.Text strong>Категория</Typography.Text>
            {categories && categories.state !== 'rejected' ? (
              <Cascader
                onChange={onCategoriesChange}
                style={{ width: '100%' }}
                multiple
                showSearch
                fieldNames={{ label: 'name', value: 'id' }}
                loading={categories.state === 'pending'}
                disabled={categories.state === 'pending'}
                options={categories.state === 'fulfilled' ? categories.value : []}
                placeholder="Выберите категории"
              />
            ) : (
              <Alert message="Error when fetch categories" type="error" />
            )}
          </Flex>
        </Col>
        <Col span={4}>
          <Flex vertical>
            <Typography.Text strong>Марка</Typography.Text>
            {markRequest && markRequest.state !== 'rejected' ? (
              <Select
                onChange={onMarksChange}
                maxTagCount={2}
                maxTagTextLength={5}
                loading={markRequest.state === 'pending'}
                disabled={markRequest.state === 'pending'}
                placeholder="Выберите марки"
                mode="multiple"
                allowClear
                // TODO: use name instead of title on real backend. This only for PREVIEW
                fieldNames={{ label: 'title', value: 'id' }}
                optionFilterProp="title"
                options={markRequest.state === 'fulfilled' ? markRequest.value.marks : []}
              />
            ) : (
              <Alert message="Error when fetch marks" type="error" />
            )}
          </Flex>
        </Col>
        <Col span={4}>
          <Flex vertical>
            <Typography.Text strong>Ед. изм.</Typography.Text>
            {measurementUnitsRequest && measurementUnitsRequest.state !== 'rejected' ? (
              <Select
                onChange={onMeasurementUnitsChange}
                maxTagCount={2}
                maxTagTextLength={5}
                loading={measurementUnitsRequest.state === 'pending'}
                disabled={measurementUnitsRequest.state === 'pending'}
                placeholder="Выберите единицы измерения"
                mode="multiple"
                allowClear
                // TODO: use name instead of title on real backend. This only for PREVIEW
                fieldNames={{ label: 'title', value: 'id' }}
                optionFilterProp="title"
                options={
                  measurementUnitsRequest.state === 'fulfilled'
                    ? measurementUnitsRequest.value.measurementUnits
                    : []
                }
              />
            ) : (
              <Alert message="Error when fetch measurement units" type="error" />
            )}
          </Flex>
        </Col>
      </Row>
    );
  },
);
