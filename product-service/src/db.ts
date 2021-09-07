import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import Product from "@resources/products/product.entity";
import Stock from "@resources/stocks/stock.entity";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export class DB {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`;

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      const connectionOptions = {
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
      } as ConnectionOptions;

      connection = await createConnection(connectionOptions);
    }

    return connection;
  }
}
