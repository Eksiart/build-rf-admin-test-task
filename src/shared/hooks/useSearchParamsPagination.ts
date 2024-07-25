import { useSearchParams } from 'react-router-dom';
import { positiveIntegerStringToNumber } from '../utils/checkPositiveInteger';
import { useState } from 'react';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from '@/shared/const/const';
import { addQueryParams } from '@/shared/utils/queryPrams';

export const useSearchParamsPagination = (
  defaultPage = DEFAULT_PAGINATION_PAGE,
  defaultPageSize = DEFAULT_PAGINATION_LIMIT,
) => {
  const [searchParams] = useSearchParams();
  const [pagination, setPaginationState] = useState({
    page: positiveIntegerStringToNumber(searchParams.get('page')) ?? defaultPage,
    limit: positiveIntegerStringToNumber(searchParams.get('limit')) ?? defaultPageSize,
  });

  const setPagination = (page: number, limit: number) => {
    addQueryParams({ page: String(page), limit: String(limit) });
    setPaginationState({ page, limit });
  };

  return { pagination, setPagination };
};
