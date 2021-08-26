import "source-map-support/register";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const getProductList = async () => {
  const products = await productController.getAll();
  return products;
};

export const main = middyfy(getProductList);
