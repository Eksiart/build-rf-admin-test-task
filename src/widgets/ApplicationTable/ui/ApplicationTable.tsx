import { Table, TableProps, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useEffect, useMemo } from 'react';
import { applicationsStore } from '@/entities/application';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useSearchParamsPagination } from '@/shared/hooks/useSearchParamsPagination';
import { getRouteCatalogManagementApplicationById } from '@/shared/const/routes';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { usePathname } from '@/shared/hooks/usePathname';

export const ApplicationTable = observer(() => {
  const pathname = usePathname();
  const { pagination, setPagination } = useSearchParamsPagination(1, 10);
  const { applicationRequest, getApplications } = applicationsStore;

  useEffect(() => {
    getApplications(pagination.page, pagination.limit);
  }, [pagination]);

  const tableColumns: TableProps['columns'] = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'XXXX',
        render: () => 'XXXX',
      },
      {
        title: 'YYYY',
        render: () => 'YYYY',
      },
      {
        title: 'ZZZZ',
        render: () => 'ZZZZ',
      },
      {
        title: 'Действия',
        key: 'actions',
        render: (_, record) => (
          <Tooltip title="Рассмотреть">
            <ButtonLink
              type="link"
              to={getRouteCatalogManagementApplicationById(record.id)}
              state={{ prevPath: pathname }}
              shape="circle"
              icon={<EyeOutlined />}
            />
          </Tooltip>
        ),
      },
    ],
    [],
  );

  if (applicationRequest.state === 'rejected') return <div>Error</div>;

  const applicationsResponse =
    applicationRequest.state === 'fulfilled'
      ? toJS(applicationRequest.value)
      : { applications: [], total: 0 };

  return (
    <Table
      rowKey="id"
      columns={tableColumns}
      dataSource={applicationsResponse.applications}
      loading={applicationRequest?.state === 'pending'}
      pagination={{
        total: applicationsResponse.total,
        position: ['bottomLeft'],
        current: pagination.page,
        pageSize: pagination.limit,
        onChange: (page, pageSize) => setPagination(page, pageSize),
      }}
    />
  );
});
