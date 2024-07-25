import { Table, TableProps } from 'antd';
import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParamsPagination } from '@/shared/hooks/useSearchParamsPagination';
import { measurementUnitStore } from '@/entities/measurementUnit';
import { MeasurementUnit } from '@/shared/types/measurementUnit';
import { EditButton } from '@/features/EditButton';

export const MeasurementUnitTable = observer(() => {
  const { pagination, setPagination } = useSearchParamsPagination(1, 10);
  const { getMeasurementUnitsList, measurementUnitsRequest, setIsFormModalOpen, setFormInitialState } =
    measurementUnitStore;

  useEffect(() => {
    getMeasurementUnitsList(pagination.page, pagination.limit);
  }, [pagination]);

  const onEdit = (_: MeasurementUnit) => {
    // TODO: CHANGE ON NORMAL BACKEND
    // setFormInitialState(record);
    setFormInitialState({ id: 1, name: 'Метр', symbol: 'м' });
    setIsFormModalOpen(true);
  };

  const tableColumns: TableProps<MeasurementUnit>['columns'] = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Название',
        key: 'name',
        render: () => 'XXXX',
      },
      {
        title: 'Символ',
        key: 'symbol',
        render: () => 'YYYY',
      },
      {
        title: 'Действия',
        key: 'actions',
        render: (_: any, record: MeasurementUnit) => <EditButton onClick={() => onEdit(record)} />,
      },
    ],
    [],
  );

  if (measurementUnitsRequest.state === 'rejected') return <div>Error</div>;

  const measurementUnitsResponse =
    measurementUnitsRequest.state === 'fulfilled'
      ? measurementUnitsRequest.value
      : { measurementUnits: [], total: 0 };

  return (
    <Table
      rowKey="id"
      columns={tableColumns}
      dataSource={measurementUnitsResponse.measurementUnits}
      loading={measurementUnitsRequest?.state === 'pending'}
      pagination={{
        total: measurementUnitsResponse.total,
        position: ['bottomLeft'],
        current: pagination.page,
        pageSize: pagination.limit,
        onChange: (page, pageSize) => setPagination(page, pageSize),
      }}
    />
  );
});
