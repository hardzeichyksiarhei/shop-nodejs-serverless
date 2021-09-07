import { Connection } from "typeorm";

import { DB } from "@db";
import { ProductRepository } from "./product.repository";

export class ProductService {
  private static instance: ProductService | null = null;
  private db: DB | null = null;

  constructor() {
    this.db = new DB();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getAll() {
    const connection: Connection = await this.db.getConnection();

    const taskRepository = connection.getCustomRepository(ProductRepository);
    return taskRepository.getAllProducts();
  }

  async getById(id: string) {
    const connection: Connection = await this.db.getConnection();

    const taskRepository = connection.getCustomRepository(ProductRepository);
    return taskRepository.getProductById(id);
  }
}
