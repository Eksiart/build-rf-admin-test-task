import { makeAutoObservable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { getMarkList } from '../../api/markApi';
import { Mark } from '@/shared/types/mark';

class MarkStore {
  markRequest: IPromiseBasedObservable<{
    marks: Mark[];
    total: number;
  }> = fromPromise.resolve({ marks: [], total: 0 });

  formInitialState?: Mark;
  isFormModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFormInitialState = (data: Mark | undefined) => {
    this.formInitialState = data;
  };
  setIsFormModalOpen = (isOpen: boolean) => {
    this.isFormModalOpen = isOpen;
  };
  getMarksList = (page?: number, limit?: number) => {
    this.markRequest = fromPromise(getMarkList(page, limit));
  };
}

export default new MarkStore();
