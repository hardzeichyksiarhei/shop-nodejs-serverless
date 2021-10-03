import "source-map-support/register";
import * as lambda from "aws-lambda";
import { SNS } from "aws-sdk";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
import { CreateProductDto } from "@resources/products/dto/create-product.dto";

const productController = ProductController.getInstance();

const catalogBatchProcess = async (event: lambda.SQSEvent) => {
  const sns = new SNS();
};

export const main = middyfy(catalogBatchProcess);
