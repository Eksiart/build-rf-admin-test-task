import { makeAutoObservable } from 'mobx';
import { Application } from '../types/application';
import { ProductsMatch } from '../types/productsMatch';
import { UnregisteredProduct } from '@/shared/types/product';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { getApplicationById } from '@/entities/application/api/applicationApi';

class ApplicationEditStore {
  application: IPromiseBasedObservable<Application> | null = null;
  match: Partial<ProductsMatch> = {};
  matches: ProductsMatch[] = [];

  constructor() {
    makeAutoObservable(this, {});
  }

  setMatchUnregistred = (uProduct?: ProductsMatch['source']) => {
    this.match.id = uProduct?.id;
    this.match.source = uProduct;
  };

  setMatchProduct = (product?: ProductsMatch['target']) => {
    this.match.target = product;
  };

  pushToMatches = () => {
    if (this.match.id && this.match.target && this.match.source) {
      this.matches.push({ id: this.match.id, source: this.match.source, target: this.match.target });
      this.match = {};
    }
  };

  deleteFromMatches = (id: ProductsMatch['id']) => {
    this.matches = this.matches.filter((uP) => uP.id !== id);
  };

  get unregisteredProducts() {
    if (this.application?.state !== 'fulfilled') return [];
    return this.application.value.products.filter(
      (p) => !(p.id === this.match.id || this.matches.some((m) => m.source.id === p.id)),
    ) as UnregisteredProduct[];
  }

  getApplicationById = (id: Application['id']) => {
    this.match = {};
    this.matches = [];
    this.application = fromPromise(getApplicationById(id));
  };
}

export default new ApplicationEditStore();
