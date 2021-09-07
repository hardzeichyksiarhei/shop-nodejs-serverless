import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

export default Product;
