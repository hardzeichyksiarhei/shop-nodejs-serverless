import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const getProductList = async (
  _event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const products = await productController.getAll();
  return products;
};

export const main = middyfy(getProductList);
