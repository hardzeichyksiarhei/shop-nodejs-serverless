import "source-map-support/register";

import { middyfy } from "@libs/lambda";
import { S3Handler, S3Event } from "aws-lambda";

import S3Utils from "../../s3";

const SOURCE_FOLDER = "uploaded";
const TARGET_FOLDER = "parsed";

const importFileParser: S3Handler = async (event: S3Event) => {
  const s3u = S3Utils.getInstance();

  for (const record of event.Records) {
    const source = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
    const fileName = source.replace(`${SOURCE_FOLDER}/`, "");

    await s3u.readFile(source, "csv");
    await s3u.copyFile(source, SOURCE_FOLDER, TARGET_FOLDER);
    await s3u.deleteFile(source);

    console.log(
      `File "${fileName}" was moved from "/${SOURCE_FOLDER}" to "/${TARGET_FOLDER}"`
    );
  }
};

export const main = middyfy(importFileParser);
