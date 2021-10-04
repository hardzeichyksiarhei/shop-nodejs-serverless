import "source-map-support/register";
import * as lambda from "aws-lambda";
import { SNS } from "aws-sdk";
import { Client, ClientConfig } from "pg";

import { middyfy } from "@libs/lambda";

import config from "../../config";
import { MessageUtil } from "@libs/message";

const { PG_USERNAME, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT, REGION } =
  config;

const dbOptions: ClientConfig = {
  user: PG_USERNAME,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: Number(PG_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const catalogBatchProcess = async (event: lambda.SQSEvent) => {
  const sns = new SNS({ region: REGION });
  const records = event.Records.map((record) => JSON.parse(record.body));

  const dbClient = new Client(dbOptions);
  await dbClient.connect();

  const ids = [];

  try {
    for (const { title, description, price, count } of records) {
      await dbClient.query("BEGIN");

      const { rows } = await dbClient.query(
        "insert into products(title, description, price) values ($1, $2, $3) returning id",
        [title, description, price]
      );

      const { id } = rows[0];

      await dbClient.query(
        "insert into stocks(product_id, count) values ($1, $2)",
        [id, count]
      );

      await dbClient.query("COMMIT");

      ids.push(id);
    }

    const highestPrice = Math.max(...records.map(({ price }) => Number(price)));

    await sns
      .publish({
        Subject: `Products uploaded #${Date.now()}`,
        Message: `Uploaded products:\n\n${JSON.stringify(records, null, 2)}`,
        TopicArn: process.env.CREATE_PRODUCT_TOPIC_ARN,
        MessageAttributes: {
          highestPrice: {
            DataType: "Number",
            StringValue: String(highestPrice),
          },
        },
      })
      .promise();

    return MessageUtil.success({ ids });
  } catch (e) {
    await dbClient.query("ROLLBACK");
    return MessageUtil.error(e);
  } finally {
    dbClient.end();
  }
};

export const main = middyfy(catalogBatchProcess);
