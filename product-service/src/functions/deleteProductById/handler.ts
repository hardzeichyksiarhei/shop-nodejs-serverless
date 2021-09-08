import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const deleteProductById = async (
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const productId = event.pathParameters.productId;

  console.log(`[product id]: ${productId}`);

  const product = await productController.deleteById(productId);
  return product;
};

export const main = middyfy(deleteProductById);
