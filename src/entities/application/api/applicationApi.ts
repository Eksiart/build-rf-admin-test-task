import { kyApi } from '@/shared/api/kyApi';
import { normalizePagination } from '@/shared/utils/normalizePagination';
import { Application } from '../model/types/application';
import { mockApplication } from '../model/const/mockApplitaion';
import { ProductsMatch } from '@/entities/application/model/types/productsMatch';

export const getApplicationList = async (page = 1, limit = 100) =>
  await kyApi
    .get(`posts`, {
      searchParams: { ...normalizePagination(page, limit) },
      hooks: {
        afterResponse: [
          async (_i, _o, response) => {
            const data = await response.json();

            if (Array.isArray(data)) {
              const modifiedData = data.map((item) => ({
                ...item,
                products: [],
                status: {
                  id: 1,
                  name: 'На рассмотрении',
                  color: 'warning',
                },
              }));

              return new Response(
                JSON.stringify({
                  applications: modifiedData,
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
    .json<{ applications: Application[]; total: number }>();

// @ts-ignore
export const getApplicationById = (id: Application['id']): Promise<Application> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApplication);
    }, 1000);
  });
};

export const fetchApproveApplication = async (data: ProductsMatch[]) =>
  await kyApi.post(`posts`, { json: data }).json();
