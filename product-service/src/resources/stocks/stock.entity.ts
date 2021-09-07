import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Product from "@resources/products/product.entity";

@Entity({ name: "stocks" })
class Stock {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: Product;

  @Column("integer")
  count: number;
}

export default Stock;
