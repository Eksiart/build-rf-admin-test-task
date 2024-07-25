import { APPLICATION_PRODUCT_STORE_NAME, CATALOG_PRODUCT_STORE_NAME } from '@/shared/const/const';
import { ProductStore } from '@/entities/product';

class RootStore {
  [CATALOG_PRODUCT_STORE_NAME] = new ProductStore(true);
  [APPLICATION_PRODUCT_STORE_NAME] = new ProductStore();
}

export default RootStore;
