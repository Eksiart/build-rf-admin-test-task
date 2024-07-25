import { Category } from '@/shared/types/category';
import { Mark } from '@/shared/types/mark';
import { MeasurementUnit } from '@/shared/types/measurementUnit';

export interface Product {
  id: number;
  name: string;
  article: string;
  category: Category;
  mark: Mark;
  measurementUnit: MeasurementUnit;
  quantityPerUnit: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  volume: number;
}

export type ProductFormType = Partial<Omit<Product, 'category' | 'mark' | 'measurementUnit'>> & {
  category: Category['id'];
  mark: Mark['id'];
  measurementUnit: MeasurementUnit['id'];
};

// Pick<Product, 'name' | 'article' | 'category' | 'mark' | 'measurementUnit' | 'quantity'>
export interface UnregisteredProduct {
  id: number;
  name: string;
  article: undefined;
  category: Category;
  mark: Mark;
  measurementUnit: MeasurementUnit;
  quantityPerUnit: number;
}
