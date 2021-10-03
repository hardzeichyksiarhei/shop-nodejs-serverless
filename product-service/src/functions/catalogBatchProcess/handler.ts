import "source-map-support/register";
import * as lambda from "aws-lambda";
import { SNS } from "aws-sdk";

import { middyfy } from "@libs/lambda";

import { ProductController } from "@resources/products/product.controller";
import { CreateProductDto } from "@resources/products/dto/create-product.dto";

const productController = ProductController.getInstance();

const catalogBatchProcess = async (event: lambda.SQSEvent) => {
  const sns = new SNS();
  const recordsData = event.Records.map((record) => JSON.parse(record.body));

  try {
    console.log(`[inserted products]: ${recordsData}`);
    const highestPrice = Math.max(
      ...recordsData.map(({ Price }) => Number(Price))
    );

    await sns
      .publish({
        Subject: `Products uploaded #${Date.now()}`,
        Message: `Uploaded products:\n\n${JSON.stringify(
          recordsData,
          null,
          2
        )}`,
        TopicArn: process.env.CREATE_PRODUCT_TOPIC_ARN,
        MessageAttributes: {
          highestPrice: {
            DataType: "Number",
            StringValue: String(highestPrice),
          },
        },
      })
      .promise();
    console.log(`[email send]: Inserted ${recordsData.length} record(s)`);
  } catch (e) {
    console.error(e);
  }
};

export const main = middyfy(catalogBatchProcess);
