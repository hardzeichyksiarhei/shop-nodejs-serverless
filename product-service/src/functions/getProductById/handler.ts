import "source-map-support/register";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const getProductById = async (event) => {
  const productId = event.pathParameters.productId;
  const product = await productController.getById(productId);
  return product;
};

export const main = middyfy(getProductById);