import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
  PRODUCTS_SUBSCRIPTION_EMAIL,
  EXPENSIVE_PRODUCTS_SUBSCRIPTION_EMAIL,
} = process.env;

const config = {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,

  PRODUCTS_SUBSCRIPTION_EMAIL,
  EXPENSIVE_PRODUCTS_SUBSCRIPTION_EMAIL,
};

export default config;
