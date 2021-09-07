import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const config = {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
};

export default config;
