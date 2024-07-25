export interface Category {
  id: number;
  name: string;
  path?: number[];
  children?: Category[];
}

export type CategoryFormType = Pick<Category, 'name'> & {
  id?: Category['id'];
  parentId?: number;
  childrenIds?: number[];
};
