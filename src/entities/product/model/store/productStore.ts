import { action, makeObservable, observable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { newQueryParams } from '@/shared/utils/queryPrams';
import { Product, ProductFormType } from '@/shared/types/product';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from '@/shared/const/const';
import { objectToSearchParamObjectOnlyStrings } from '@/shared/utils/objectToSearchParamObject';
import { getProductList } from '../../api/productApi';
import { ProductFilters } from '../types/productFilters';

class ProductStore {
  productRequest: IPromiseBasedObservable<{
    products: Product[];
    total: number;
  }> = fromPromise.resolve({ products: [], total: 0 });

  @observable
  formInitialState?: ProductFormType;
  isFormModalOpen: boolean = false;

  productFilters: ProductFilters = {
    limit: DEFAULT_PAGINATION_LIMIT,
    page: DEFAULT_PAGINATION_PAGE,
  };

  private isUseSearchParams: boolean = false;

  constructor(isUseSearchParams: boolean = false) {
    makeObservable(this, {
      productRequest: observable,
      productFilters: observable,
      isFormModalOpen: observable,
      setIsFormModalOpen: action,
      setFormInitialState: action,
      setProductFiltersAndRefetchProducts: action,
      getProductList: action,
    });
    this.isUseSearchParams = isUseSearchParams;
  }

  setFormInitialState = (data: ProductFormType | undefined) => {
    this.formInitialState = data;
  };
  setIsFormModalOpen = (isOpen: boolean) => {
    this.isFormModalOpen = isOpen;
  };

  setProductFiltersAndRefetchProducts = (data: ProductFilters) => {
    this.productFilters = data;
    if (this.isUseSearchParams) {
      newQueryParams(objectToSearchParamObjectOnlyStrings(this.productFilters));
    }
    this.getProductList();
  };

  getProductList = () => {
    this.productRequest = fromPromise(getProductList(this.productFilters));
  };
}

export default ProductStore;
