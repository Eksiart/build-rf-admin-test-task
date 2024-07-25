import { Category } from '@/shared/types/category';

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Электроника',
    children: [
      {
        id: 11,
        name: 'Телефоны и смарт-часы',
        path: [1],
        children: [
          {
            id: 111,
            name: 'Телефоны',
            path: [1, 11],
            children: [
              {
                id: 1111,
                name: 'Смартфоны',
                path: [1, 11, 111],
              },
            ],
          },
          {
            id: 112,
            name: 'Смарт-часы',
            path: [1, 11],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Одежда',
    children: [
      {
        id: 21,
        name: 'Мужчинам',
        path: [2],
        children: [
          {
            id: 211,
            name: 'Верхняя одежда',
            path: [2, 21],
            children: [
              {
                id: 2111,
                name: 'Брюки',
                path: [2, 21, 211],
              },
            ],
          },
          {
            id: 212,
            name: 'Домашняя одежда',
            path: [2, 21],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Обувь',
  },
  {
    id: 4,
    name: 'Мебель',
  },
];
