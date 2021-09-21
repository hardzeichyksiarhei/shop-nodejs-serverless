import "source-map-support/register";
import * as lambda from "aws-lambda";

import { middyfy } from "@libs/lambda";
import { MessageUtil } from "@libs/message";
import S3Utils from "../../s3";

import config from "./../../config";

const { IMPORT_BUCKET_NAME } = config;

const importProductsFile = async (event: lambda.APIGatewayProxyEvent) => {
  const filename = decodeURIComponent(event.queryStringParameters.name);
  console.log(`[filename]: ${filename}`);

  try {
    const s3u = S3Utils.getInstance();

    const params = {
      Bucket: IMPORT_BUCKET_NAME,
      Key: `uploaded/${filename}`,
      Expires: 60,
      ContentType: "text/csv",
    };
    const signedUrl = await s3u.s3.getSignedUrlPromise("putObject", params);

    return MessageUtil.success({ signedUrl });
  } catch (error) {
    return MessageUtil.error(error);
  }
};

export const main = middyfy(importProductsFile);
