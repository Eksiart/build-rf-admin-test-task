import { PAGINATION_LIMIT_NAME, PAGINATION_OFFSET_NAME } from '@/shared/const/const';

export const normalizePagination = (
  page: number | undefined,
  limit: number | undefined,
): Record<string, number> => {
  if (page && limit) {
    return { [PAGINATION_OFFSET_NAME]: (page - 1) * limit, [PAGINATION_LIMIT_NAME]: limit };
  }
  return {};
};
