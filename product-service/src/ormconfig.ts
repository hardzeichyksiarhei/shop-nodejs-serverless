import path from "path";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import Product from "@resources/products/product.entity";
import Stock from "@resources/stocks/stock.entity";

import config from "./config";

const { PG_HOST, PG_PORT, PG_USERNAME, PG_DATABASE, PG_PASSWORD } = config;

export default {
  name: `default`,
  type: `postgres`,
  port: Number(PG_PORT),
  synchronize: false,
  host: PG_HOST,
  username: PG_USERNAME,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Product, Stock],

  migrationsTableName: "migrations",
  migrations: [path.join(__dirname, "migrations/*.ts")],
  cli: { migrationsDir: "src/migrations" },
} as ConnectionOptions;
