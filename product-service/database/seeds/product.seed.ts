import { Factory, Seeder } from "typeorm-seeding";
import Product from "../../src/resources/products/product.entity";

export default class CreateProducts implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Product)().createMany(15);
  }
}
