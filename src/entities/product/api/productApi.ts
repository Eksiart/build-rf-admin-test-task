import { kyApi } from '@/shared/api/kyApi';
import { Product, ProductFormType } from '@/shared/types/product';
import { normalizePagination } from '@/shared/utils/normalizePagination';
import { objectToSearchParamObject } from '@/shared/utils/objectToSearchParamObject';
import { ProductFilters } from '../model/types/productFilters';

export const createProduct = async (data: ProductFormType) =>
  await kyApi.post(`posts`, { json: data }).json<Product>();

export const getProductById = async (id: string | number) => await kyApi.get(`posts/${id}`).json<Product>();

export const updateProduct = async (data: ProductFormType) =>
  await kyApi.put(`posts/${data.id}`, { json: data }).json<Product>();

export const getProductList = async ({ page, limit, ...otherFilters }: ProductFilters) => {
  return await kyApi
    .get(`posts`, {
      searchParams: { ...normalizePagination(page, limit), ...objectToSearchParamObject(otherFilters) },
      hooks: {
        afterResponse: [
          async (_i, _o, response) => {
            const data = await response.json();

            if (Array.isArray(data)) {
              return new Response(
                JSON.stringify({
                  products: data,
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
    .json<{ products: Product[]; total: number }>();
};
