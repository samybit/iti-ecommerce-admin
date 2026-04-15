export interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  discount: string;
}

export type IProductForm = Omit<IProduct, "_id" | "price" | "stock"> & {
  price: string;
  stock: string;
};
