import { makeAutoObservable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { MeasurementUnit } from '@/shared/types/measurementUnit';
import { getMeasurementUnitList } from '../../api/measurementUnitApi';

class MeasurementUnitStore {
  measurementUnitsRequest: IPromiseBasedObservable<{
    measurementUnits: MeasurementUnit[];
    total: number;
  }> = fromPromise.resolve({ measurementUnits: [], total: 0 });

  formInitialState?: MeasurementUnit;
  isFormModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFormInitialState = (data: MeasurementUnit | undefined) => {
    this.formInitialState = data;
  };
  setIsFormModalOpen = (isOpen: boolean) => {
    this.isFormModalOpen = isOpen;
  };
  getMeasurementUnitsList = (page?: number, limit?: number) => {
    this.measurementUnitsRequest = fromPromise(getMeasurementUnitList(page, limit));
  };
}

export default new MeasurementUnitStore();
