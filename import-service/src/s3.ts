import AWS from "aws-sdk";
import { Readable } from "stream";
import csv from "csv-parser";

import config from "./config";

const { IMPORT_BUCKET_NAME, REGION } = config;

class S3Utils {
  private static instance: S3Utils | null = null;
  private _s3: AWS.S3 | null = null;

  constructor() {
    this._s3 = new AWS.S3({ region: REGION });
  }

  public static getInstance(): S3Utils {
    if (!S3Utils.instance) {
      S3Utils.instance = new S3Utils();
    }
    return S3Utils.instance;
  }

  public get s3() {
    return this._s3;
  }

  readFile(source: string, type?: string): Promise<Readable> {
    const readStream = this.s3
      .getObject({
        Bucket: IMPORT_BUCKET_NAME,
        Key: source,
      })
      .createReadStream();

    if (type === "csv") readStream.pipe(csv()).on("data", console.log);

    return new Promise(
      (resolve, reject): Readable =>
        readStream.on("error", reject).on("end", resolve)
    );
  }

  copyFile(source: string, sourceFolder: string, targetFolder: string) {
    return this.s3
      .copyObject({
        Bucket: IMPORT_BUCKET_NAME,
        CopySource: `${IMPORT_BUCKET_NAME}/${source}`,
        Key: source.replace(sourceFolder, targetFolder),
      })
      .promise();
  }

  deleteFile(source: string) {
    return this.s3
      .deleteObject({
        Bucket: IMPORT_BUCKET_NAME,
        Key: source,
      })
      .promise();
  }
}

export default S3Utils;
