import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
import { UpdateProductDto } from "@resources/products/dto/update-product.dto";
const productController = ProductController.getInstance();

const updateProductById = async (
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const productId = event.pathParameters.productId;
  const payload = event.body as unknown as UpdateProductDto;

  console.log(`[product id]: ${productId}`);
  console.log(`[product]: ${JSON.stringify(payload)}`);

  const product = await productController.update(productId, payload);
  return product;
};

export const main = middyfy(updateProductById);
