import {
  Connection,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from "typeorm";

import ormconfig from "./ormconfig";

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
      connection = await createConnection(ormconfig);
    }

    return connection;
  }
}
