import AWS from "aws-sdk";
import { MessageUtil } from "@libs/message";

import config from "./../../config";

const { IMPORT_BUCKET_NAME, REGION } = config;

console.log(config);

export class ProductController {
  private static instance: ProductController | null = null;

  public static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }

  async getSignURL(filename: string) {
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
  }
}
