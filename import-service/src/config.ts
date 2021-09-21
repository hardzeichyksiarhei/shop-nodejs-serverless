import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const { IMPORT_BUCKET_NAME } = process.env;

const IMPORT_BUCKET_ARN = `arn:aws:s3:::${IMPORT_BUCKET_NAME}`;

const config = { IMPORT_BUCKET_NAME, IMPORT_BUCKET_ARN };

export default config;
