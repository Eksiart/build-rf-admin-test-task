import { kyApi } from '@/shared/api/kyApi';
import { Category, CategoryFormType } from '@/shared/types/category';
import { mockCategories } from '../model/const/mockCategories';

export const createCategory = async (data: CategoryFormType) =>
  await kyApi.post(`posts`, { json: data }).json<Category>();

export const updateCategory = async (data: CategoryFormType) =>
  await kyApi.put(`posts/${data.id}`, { json: data }).json<Category>();

// export const getCategoryList = async () => await kyApi.get(`posts`).json<Category[]>();
export const getCategoryList = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 1000);
  });
};

export const moveCategory = async (categoryId: Category['id'], parentId: Category['id']) =>
  await kyApi.post(`posts`, { json: { categoryId, parentId } }).json<boolean>();
