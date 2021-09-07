import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStocksTable1631051896195 implements MigrationInterface {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName || "stocks";
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
            generationStrategy: "uuid",
            default: `uuid_generate_v4()`,
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "count",
            type: "integer",
          },
        ],
      }),
      true
    );

    queryRunner.clearSqlMemory();

    const foreignKey = new TableForeignKey({
      columnNames: ["product_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "products",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("stocks", foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE ${this.tableName}`);
  }
}
