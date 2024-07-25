import { makeAutoObservable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { Category, CategoryFormType } from '@/shared/types/category';
import { getCategoryList } from '../../api/categoryApi';

class CategoryStore {
  categories?: IPromiseBasedObservable<Category[]> = fromPromise.resolve([]);
  selectedCategories: number[] = [];

  formInitialState?: CategoryFormType;
  isFormModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFormInitialStateForCreate = (data: Category | undefined) => {
    this.formInitialState = {
      name: '',
      parentId: data ? data.id : undefined,
    };
  };
  setFormInitialStateForUpdate = (data: Category | undefined) => {
    this.formInitialState = data
      ? {
          id: data.id,
          name: data.name,
          childrenIds: data.children ? data.children.map((c) => c.id) : undefined,
          parentId: data.path && data.path.length > 0 ? data.path[data.path?.length - 1] : undefined,
        }
      : undefined;
  };
  setIsFormModalOpen = (isOpen: boolean) => {
    this.isFormModalOpen = isOpen;
  };

  setSelectedCategories = (ids: number[]) => {
    this.selectedCategories = ids;
  };

  getCategoriesList = () => {
    this.categories = fromPromise(getCategoryList());
  };
}

export default new CategoryStore();
