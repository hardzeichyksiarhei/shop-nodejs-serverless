import { Product } from "./product.model";

export class ProductService {
  static async getAll() {
    return Product.getAll();
  }

  static async getById(id: string) {
    return Product.getById(id);
  }
}
