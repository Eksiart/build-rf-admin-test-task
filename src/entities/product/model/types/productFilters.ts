import { Category } from '@/shared/types/category';
import { MeasurementUnit } from '@/shared/types/measurementUnit';
import { Mark } from '@/shared/types/mark';

export interface ProductFilters {
  page: number;
  limit: number;
  search?: string;
  markIds?: Mark['id'][];
  measurementUnitIds?: MeasurementUnit['id'][];
  categoryIds?: Category['id'][];
}
