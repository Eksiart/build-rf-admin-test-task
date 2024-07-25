import { kyApi } from '@/shared/api/kyApi';
import { MeasurementUnit } from '@/shared/types/measurementUnit';
import { normalizePagination } from '@/shared/utils/normalizePagination';

export const createMeasurementUnit = async (data: Omit<MeasurementUnit, 'id'>) =>
  await kyApi.post(`posts`, { json: data }).json<MeasurementUnit>();

export const getMeasurementUnitById = async (id: string | number) =>
  await kyApi.get(`posts/${id}`).json<MeasurementUnit>();

export const updateMeasurementUnit = async (data: MeasurementUnit) =>
  await kyApi.put(`posts/${data.id}`, { json: data }).json<MeasurementUnit>();

export const getMeasurementUnitList = async (page?: number, limit?: number) =>
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
                  measurementUnits: data,
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
    .json<{ measurementUnits: MeasurementUnit[]; total: number }>();
