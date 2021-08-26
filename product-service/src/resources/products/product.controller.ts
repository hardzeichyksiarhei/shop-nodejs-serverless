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
      return products;
    } catch (err) {
      console.error(err);
    }
  }

  async getById(id: string) {
    try {
      const product = await ProductService.getById(id);

      return product;
    } catch (err) {
      console.error(err);
    }
  }
}
