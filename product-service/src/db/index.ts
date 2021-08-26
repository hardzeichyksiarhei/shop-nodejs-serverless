import * as products from "./tables/products.json";

const tables = { products };

export class DB {
  private static instance: DB | null = null;

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  static getTable(tableName) {
    if (tables[tableName]) return tables[tableName].default;
    throw Error(`Table "${tableName}" is not found.`);
  }
}
