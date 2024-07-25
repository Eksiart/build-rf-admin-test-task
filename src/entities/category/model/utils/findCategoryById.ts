import { Category } from '@/shared/types/category';

export const findCategoryById = (categories: Category[], id: number): Category | undefined => {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.children) {
      const found = findCategoryById(category.children, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};
