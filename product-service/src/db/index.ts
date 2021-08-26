import * as products from "./tables/products.json";

const tables = { products };

export class DB {
  instance = null;
  constructor() {}

  getInstance() {
    if (!this.instance) this.instance = new DB();
    return this.instance;
  }

  static getTable(tableName) {
    if (tables[tableName]) return tables[tableName].default;
    throw Error(`Table "${tableName}" is not found.`);
  }
}
