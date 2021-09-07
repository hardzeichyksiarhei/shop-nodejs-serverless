import { NotFoundError, AppValidationError } from "@libs/appError";
import { MessageUtil } from "@libs/message";

import { ProductService } from "@resources/products/product.service";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateProductDto } from "./dto/create-user.dto";

const productService = ProductService.getInstance();

export class ProductController {
  private static instance: ProductController | null = null;

  public static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = plainToClass(CreateProductDto, createProductDto);

      const errors = await validate(product);

      if (errors.length) throw new AppValidationError(errors);

      const { id } = await productService.create(product);

      return MessageUtil.success({ id });
    } catch (error) {
      return MessageUtil.error(error);
    }
  }

  async getAll() {
    try {
      const products = await productService.getAll();
      return MessageUtil.success(products);
    } catch (error) {
      return MessageUtil.error(error);
    }
  }

  async getById(id: string) {
    try {
      const product = await productService.getById(id);

      if (!product) {
        throw new NotFoundError(
          `Produst #${id} not found.`,
          "PRODUCT_NOT_FOUND"
        );
      }

      return MessageUtil.success(product);
    } catch (error) {
      return MessageUtil.error(error);
    }
  }

  async deleteById(id: string) {
    try {
      const product = await productService.deleteById(id);

      return MessageUtil.success(product);
    } catch (error) {
      return MessageUtil.error(error);
    }
  }
}
