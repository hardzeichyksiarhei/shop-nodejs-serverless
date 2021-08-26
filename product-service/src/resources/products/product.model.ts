import { DB } from "../../db";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  count: number;
  price: number;
}

export class Product {
  id: string;
  title: string;
  description: string;
  count: number;
  price: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.count = product.count;
    this.price = product.price;
  }

  static getAll() {
    const products = DB.getTable("products");
    return products;
  }

  static getById(id: string) {
    const products = DB.getTable("products");
    return products.find((product) => id === product.id);
  }
}
