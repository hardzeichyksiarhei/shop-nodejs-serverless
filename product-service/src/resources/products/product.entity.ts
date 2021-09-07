import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Stock from "@resources/stocks/stock.entity";

@Entity({ name: "products" })
class Product {
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

export default Product;
