import {ProductInterface} from "./product.interface";

export interface ProductOrderInterface {
  id: string;
  date: string;
  // productId: string[]
  productId: string;
  userId: string;
}
