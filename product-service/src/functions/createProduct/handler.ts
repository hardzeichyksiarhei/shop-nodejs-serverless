import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
import { CreateProductDto } from "@resources/products/dto/create-product.dto";
const productController = ProductController.getInstance();

const createProduct = async (
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const payload = event.body as unknown as CreateProductDto;

  const product = await productController.create(payload);
  return product;
};

export const main = middyfy(createProduct);
