import { define } from "typeorm-seeding";
import faker from "faker";

import Product from "../../src/resources/products/product.entity";

define(Product, () => {
  const product = new Product();
  product.title = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = Number(faker.commerce.price(50, 200));

  return product;
});
