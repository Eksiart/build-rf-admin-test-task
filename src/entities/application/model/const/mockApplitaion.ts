import { Application } from '@/entities/application';

export const mockApplication: Application = {
  id: 1,
  products: [
    {
      id: 1,
      name: 'Продукт 1',
      category: {
        id: 1,
        name: 'Категория 1',
      },
      mark: {
        id: 1,
        name: 'Марка 1',
      },
      measurementUnit: {
        id: 1,
        name: 'Штука',
        symbol: 'шт',
      },
      quantityPerUnit: 1000,
    },
    {
      id: 2,
      name: 'Продукт 2',
      category: {
        id: 1,
        name: 'Категория 1',
      },
      mark: {
        id: 1,
        name: 'Марка 1',
      },
      measurementUnit: {
        id: 1,
        name: 'Штука',
        symbol: 'шт',
      },
      quantityPerUnit: 100,
    },
    {
      id: 3,
      name: 'Продукт 3',
      category: {
        id: 1,
        name: 'Категория 1',
      },
      mark: {
        id: 1,
        name: 'Марка 1',
      },
      measurementUnit: {
        id: 1,
        name: 'Штука',
        symbol: 'шт',
      },
      quantityPerUnit: 10,
    },
  ],
  status: {
    id: 1,
    name: 'На рассмотрении',
  },
};
