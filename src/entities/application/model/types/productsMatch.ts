import { Product, UnregisteredProduct } from '@/shared/types/product';

export interface ProductsMatch {
  id: UnregisteredProduct['id'];
  source: UnregisteredProduct;
  target: Product;
}
