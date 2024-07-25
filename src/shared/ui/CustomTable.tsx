import { Table, TablePaginationConfig, TableProps } from 'antd';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { TableRef } from 'antd/es/table';

interface Props extends TableProps {
  pagination?: false | (TablePaginationConfig & { to?: string; search?: string });
}

export const CustomTable = forwardRef<TableRef, Props>((props, ref) => {
  const { rowKey = 'id', pagination, ...otherProps } = props;
  return (
    <Table
      {...otherProps}
      rowKey={rowKey}
      pagination={
        pagination
          ? {
              ...pagination,
              itemRender: pagination.to
                ? (page, type, originalElement) => {
                    const search = pagination.search;
                    const to = pagination ? pagination.to : undefined;
                    const pageSize = pagination && pagination.pageSize ? pagination.pageSize : undefined;

                    switch (type) {
                      case 'page':
                        if (!to) return originalElement;
                        return (
                          <Link
                            reloadDocument={false}
                            to={{
                              pathname: to,
                              search: search ?? `?page=${page}${pageSize ? `&pageSize=${pageSize}` : ''}`,
                            }}
                          >
                            {page}
                          </Link>
                        );
                      // TODO: Create other buttons with client routing
                      case 'next':
                      case 'prev':
                      case 'jump-next':
                      case 'jump-prev':
                      default:
                        return originalElement;
                    }
                  }
                : undefined,
            }
          : pagination
      }
      ref={ref}
    />
  );
});
