import { kyApi } from '@/shared/api/kyApi';
import { Mark } from '@/shared/types/mark';
import { normalizePagination } from '@/shared/utils/normalizePagination';

export const createMark = async (data: Omit<Mark, 'id'>) =>
  await kyApi.post(`posts`, { json: data }).json<Mark>();

export const getMarkById = async (id: string | number) => await kyApi.get(`posts/${id}`).json<Mark>();

export const updateMark = async (data: Mark) =>
  await kyApi.put(`posts/${data.id}`, { json: data }).json<Mark>();

export const getMarkList = async (page?: number, limit?: number) =>
  await kyApi
    .get(`posts`, {
      searchParams: { ...normalizePagination(page, limit) },
      hooks: {
        afterResponse: [
          async (_i, _o, response) => {
            const data = await response.json();

            if (Array.isArray(data)) {
              return new Response(
                JSON.stringify({
                  marks: data,
                  total: parseInt(response.headers.get('X-Total-Count') ?? '0', 10),
                }),
                {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers,
                },
              );
            }

            return response;
          },
        ],
      },
    })
    .json<{ marks: Mark[]; total: number }>();
