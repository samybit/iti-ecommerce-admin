export interface ICategory {
  _id: string;
  name: string;
}

export type ICategoryForm = Omit<ICategory, "_id">;