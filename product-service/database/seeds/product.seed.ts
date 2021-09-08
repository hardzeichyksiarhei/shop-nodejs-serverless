import { Factory, Seeder } from "typeorm-seeding";

import Product from "../../src/resources/products/product.entity";
import Stock from "../../src/resources/stocks/stock.entity";

export default class CreateProducts implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const products = await factory(Product)().createMany(10);

    for (const product of products) {
      await factory(Stock)({ product }).create();
    }
  }
}
