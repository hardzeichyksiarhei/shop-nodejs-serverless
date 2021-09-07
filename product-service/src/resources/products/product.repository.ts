import { EntityRepository, Repository } from "typeorm";
import Product from "./product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  createProduct(product: Omit<Product, "id">) {
    return this.create(product);
  }

  getAllProducts() {
    return this.find();
  }

  getProductById(id: string) {
    return this.findOne({ id });
  }
}
