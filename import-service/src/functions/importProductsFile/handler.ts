import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
const productController = ProductController.getInstance();

const importProductsFile = async (event: lambda.APIGatewayProxyEvent) => {
  const filename = decodeURIComponent(event.queryStringParameters.name);
  console.log(`[import file with name]: ${filename}`);

  const signedUrl = await productController.getSignURL(filename);
  return signedUrl;
};

export const main = middyfy(importProductsFile);
