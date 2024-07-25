import { Table, TableProps } from 'antd';
import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParamsPagination } from '@/shared/hooks/useSearchParamsPagination';
import { markStore } from '@/entities/mark';
import { Mark } from '@/shared/types/mark';
import { EditButton } from '@/features/EditButton';

export const MarkTable = observer(() => {
  const { pagination, setPagination } = useSearchParamsPagination();
  const { getMarksList, markRequest, setIsFormModalOpen, setFormInitialState } = markStore;

  useEffect(() => {
    getMarksList(pagination.page, pagination.limit);
  }, [pagination]);

  const onEdit = (_: Mark) => {
    // TODO: CHANGE ON NORMAL BACKEND
    // setFormInitialState(record);
    setFormInitialState({ id: 1, name: '200 СБ' });
    setIsFormModalOpen(true);
  };

  const tableColumns: TableProps<Mark>['columns'] = useMemo(
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
        title: 'Действия',
        key: 'actions',
        render: (_: any, record: Mark) => <EditButton onClick={() => onEdit(record)} />,
      },
    ],
    [],
  );

  if (markRequest.state === 'rejected') return <div>Error</div>;

  const marksResponse = markRequest.state === 'fulfilled' ? markRequest.value : { marks: [], total: 0 };

  return (
    <Table
      rowKey="id"
      columns={tableColumns}
      dataSource={marksResponse.marks}
      loading={markRequest?.state === 'pending'}
      pagination={{
        total: marksResponse.total,
        position: ['bottomLeft'],
        current: pagination.page,
        pageSize: pagination.limit,
        onChange: (page, limit) => setPagination(page, limit),
      }}
    />
  );
});
