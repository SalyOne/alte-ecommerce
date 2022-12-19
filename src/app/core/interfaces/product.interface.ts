import {ICategory} from "./category.interface";

export interface IProduct {
  id: string;
  title: string;
  categories: ICategory;
  image: string;
  price: number;
  description:string;
}
