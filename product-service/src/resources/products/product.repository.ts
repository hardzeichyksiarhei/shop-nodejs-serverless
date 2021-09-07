import { EntityRepository, Repository } from "typeorm";
import Product from "./product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  createProduct(product: Omit<Product, "id">) {
    return this.create(product);
  }

  getAllProducts() {
    return this.createQueryBuilder("product")
      .leftJoin("product.stock", "stock")
      .select("product.id", "id")
      .addSelect("product.title", "title")
      .addSelect("product.description", "description")
      .addSelect("product.price", "price")
      .addSelect("stock.count", "count")
      .getRawMany();
  }

  getProductById(id: string) {
    return this.createQueryBuilder("product")
      .where("product.id = :id", { id })
      .leftJoin("product.stock", "stock")
      .select("product.id", "id")
      .addSelect("product.title", "title")
      .addSelect("product.description", "description")
      .addSelect("product.price", "price")
      .addSelect("stock.count", "count")
      .getRawOne();
  }
}
