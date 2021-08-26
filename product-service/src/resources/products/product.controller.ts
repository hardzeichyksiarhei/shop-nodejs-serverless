import { NotFoundError } from "@libs/appError";
import { MessageUtil } from "@libs/message";

import { ProductService } from "./product.service";

export class ProductController {
  private static instance: ProductController | null = null;

  public static getInstance(): ProductController {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }

  async getAll() {
    try {
      const products = await ProductService.getAll();
      return MessageUtil.success(products);
    } catch (err) {
      return MessageUtil.error(err.message, err.statusCode, err.code);
    }
  }

  async getById(id: string) {
    try {
      const product = await ProductService.getById(id);

      if (!product) {
        throw new NotFoundError(
          `Produst #${id} not found.`,
          "PRODUCT_NOT_FOUND"
        );
      }

      return MessageUtil.success(product);
    } catch (err) {
      return MessageUtil.error(err.message, err.statusCode, err.code);
    }
  }
}
