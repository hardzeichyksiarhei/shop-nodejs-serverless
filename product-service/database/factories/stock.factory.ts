import { define } from "typeorm-seeding";
import faker from "faker";

import Product from "../../src/resources/products/product.entity";
import Stock from "../../src/resources/stocks/stock.entity";

interface Context {
  product: Product;
}

define(Stock, (_, context: Context) => {
  const { product } = context;

  const stock = new Stock();
  stock.product = product;
  stock.count = faker.datatype.number({ min: 1, max: 200 });

  return stock;
});
