import AWS from "aws-sdk";
import { Readable } from "stream";
import csv from "csv-parser";

import config from "./config";

const { IMPORT_BUCKET_NAME, REGION, CATALOG_ITEMS_QUEUE_URL } = config;

class S3Utils {
  private static instance: S3Utils | null = null;
  private _s3: AWS.S3 | null = null;
  private _sqs: AWS.SQS | null = null;

  constructor() {
    this._s3 = new AWS.S3({ region: REGION });
    this._sqs = new AWS.SQS();
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

  public get sqs() {
    return this._sqs;
  }

  readFile(
    source: string,
    type: string = "csv",
    isSendMessage: boolean = false
  ): Promise<Readable> {
    const readStream = this.s3
      .getObject({
        Bucket: IMPORT_BUCKET_NAME,
        Key: source,
      })
      .createReadStream();

    if (type === "csv") {
      const transformRecordsStream = readStream.pipe(csv());

      transformRecordsStream.on("data", (record) => {
        console.log(record);
        if (isSendMessage) {
          this.sqs.sendMessage(
            {
              MessageBody: JSON.stringify(record),
              QueueUrl: CATALOG_ITEMS_QUEUE_URL,
            },
            (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(data);
            }
          );
        }
      });
    }

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
