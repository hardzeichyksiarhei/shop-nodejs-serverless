import "source-map-support/register";

import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const getProductList = async () => {
  const products = await productController.getAll();
  return formatJSONResponse({ products });
};

export const main = middyfy(getProductList);
