import { makeAutoObservable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { Application } from '../types/application';
import { getApplicationList } from '../../api/applicationApi';

class ApplicationsStore {
  applicationRequest: IPromiseBasedObservable<{
    applications: Application[];
    total: number;
  }> = fromPromise.resolve({ applications: [], total: 0 });

  constructor() {
    makeAutoObservable(this);
  }

  getApplications = (page = 1, limit = 10) => {
    this.applicationRequest = fromPromise(getApplicationList(page, limit));
  };
}

export default new ApplicationsStore();
