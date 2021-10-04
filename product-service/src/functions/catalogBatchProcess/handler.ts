import "source-map-support/register";
import * as lambda from "aws-lambda";
import { SNS } from "aws-sdk";

import { middyfy } from "@libs/lambda";

import config from "../../config";

// import { ProductController } from "@resources/products/product.controller";

// const productController = ProductController.getInstance();

import { DB } from "@db";
import { Product } from "@resources/products/product.entity";

const { REGION } = config;

const catalogBatchProcess = async (event: lambda.SQSEvent) => {
  const sns = new SNS({ region: REGION });
  const recordsData = event.Records.map((record) => JSON.parse(record.body));

  // const db = new DB();
  // const connection = await db.getConnection();

  try {
    // for (const record of recordsData) {
    //   await productController.create(record);
    // }
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Product)
    //   .values(recordsData)
    //   .execute();

    const highestPrice = Math.max(
      ...recordsData.map(({ price }) => Number(price))
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
