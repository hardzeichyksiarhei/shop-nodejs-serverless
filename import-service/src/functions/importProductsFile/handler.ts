import "source-map-support/register";
import * as lambda from "aws-lambda";
import AWS from "aws-sdk";

import { middyfy } from "@libs/lambda";
import { MessageUtil } from "@libs/message";

import config from "./../../config";

const { IMPORT_BUCKET_NAME, REGION } = config;

const importProductsFile = async (event: lambda.APIGatewayProxyEvent) => {
  const filename = decodeURIComponent(event.queryStringParameters.name);
  console.log(`[filename]: ${filename}`);

  try {
    const s3 = new AWS.S3({ region: REGION });
    const params = {
      Bucket: IMPORT_BUCKET_NAME,
      Key: `uploaded/${filename}`,
      Expires: 60,
      ContentType: "text/csv",
    };
    const signedUrl = await s3.getSignedUrlPromise("putObject", params);

    return MessageUtil.success({ signedUrl });
  } catch (error) {
    return MessageUtil.error(error);
  }
};

export const main = middyfy(importProductsFile);
