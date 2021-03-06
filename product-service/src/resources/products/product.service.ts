import { Connection } from "typeorm";

import { DB } from "@db";

import { Product, Stock } from "@resources/products/product.entity";

import { ProductRepository } from "./product.repository";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import { NotFoundError } from "@libs/appError";

export class ProductService {
  private static instance: ProductService | null = null;
  private db: DB | null = null;

  constructor() {
    this.db = new DB();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async create(createProductDto: CreateProductDto) {
    const connection: Connection = await this.db.getConnection();

    const product = new Product();
    product.title = createProductDto.title;
    product.description = createProductDto.description;
    product.price = createProductDto.price;

    const stock = new Stock();
    stock.product = product;
    stock.count = createProductDto.count;

    await connection.transaction(async (manager) => {
      await manager.getRepository(Product).save(product);
      await manager.getRepository(Stock).save(stock);
    });

    return { id: product.id };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const connection: Connection = await this.db.getConnection();

    const productRepository = connection.getRepository(Product);
    const stockRepository = connection.getRepository(Stock);

    const product = await productRepository.findOne({ id });

    product.title = updateProductDto.title;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;

    const stock = await stockRepository.findOne({ product });

    stock.count = updateProductDto.count;

    await connection.transaction(async (manager) => {
      await manager.getRepository(Product).save(product);
      await manager.getRepository(Stock).save(stock);
    });

    return { id: product.id };
  }

  async getAll() {
    const connection: Connection = await this.db.getConnection();

    const productRepository = connection.getCustomRepository(ProductRepository);
    return productRepository.getAllProducts();
  }

  async getById(id: string) {
    const connection: Connection = await this.db.getConnection();

    const productRepository = connection.getCustomRepository(ProductRepository);
    const product = await productRepository.getProductById(id);

    if (!product) {
      throw new NotFoundError(`Produst #${id} not found.`, "PRODUCT_NOT_FOUND");
    }

    return product;
  }

  async deleteById(id: string) {
    const connection: Connection = await this.db.getConnection();

    const productRepository = connection.getCustomRepository(ProductRepository);
    const product = await productRepository.getProductById(id);

    if (!product) {
      throw new NotFoundError(`Produst #${id} not found.`, "PRODUCT_NOT_FOUND");
    }

    await productRepository.delete({ id });

    return { id };
  }
}
