import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title: string;

  @Column("text")
  description: string;

  @Column("text")
  price: number;

  @OneToOne(() => Stock, (stock) => stock.product)
  public stock: Stock;
}

@Entity({ name: "stocks" })
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Product, (product) => product.stock, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: Product;

  @Column("integer")
  count: number;
}
