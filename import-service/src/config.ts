import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const { IMPORT_BUCKET_NAME, REGION, STAGE, CATALOG_ITEMS_QUEUE_URL } =
  process.env;

const IMPORT_BUCKET_ARN = `arn:aws:s3:::${IMPORT_BUCKET_NAME}`;
const PRODUCT_SERVICE_STACK_NAME = `product-service-${STAGE || "dev"}`;
const AUTHORIZATION_SERVICE_STACK_NAME = `authorization-service-${
  STAGE || "dev"
}`;

const config = {
  IMPORT_BUCKET_NAME,
  IMPORT_BUCKET_ARN,
  REGION: REGION ?? "eu-west-1",
  CATALOG_ITEMS_QUEUE_URL,
  PRODUCT_SERVICE_STACK_NAME,
  AUTHORIZATION_SERVICE_STACK_NAME,
};

export default config;
