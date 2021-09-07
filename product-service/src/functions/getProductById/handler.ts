import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const getProductById = async (
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const productId = event.pathParameters.productId;

  const product = await productController.getById(productId);
  return product;
};

export const main = middyfy(getProductById);
