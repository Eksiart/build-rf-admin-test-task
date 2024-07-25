import { UnregisteredProduct } from '@/shared/types/product';
import { Status } from '@/shared/types/status';

export interface Application {
  id: number;
  products: UnregisteredProduct[];
  status: Status;
}
