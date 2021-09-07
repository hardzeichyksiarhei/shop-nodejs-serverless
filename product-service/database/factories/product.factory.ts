import { getRepository } from "typeorm";
import { define } from "typeorm-seeding";
import faker from "faker";

import Product from "../../src/resources/products/product.entity";
import Stock from "../../src/resources/stocks/stock.entity";

define(Product, () => {
  const product = new Product();
  product.title = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = Number(faker.commerce.price(50, 200));

  const stock = new Stock();
  stock.product = product;
  stock.count = faker.datatype.number({ min: 1, max: 200 });

  getRepository(Product)
    .save(product)
    .then(() => {
      getRepository(Stock).save(stock);
    });

  return product;
});
