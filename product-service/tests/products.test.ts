import { request, routes } from "./utils";

describe("Boards suite", () => {
  describe("GET", () => {
    it("should get all products", async () => {
      await request
        .get(routes.products.getAll)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          const { data: products } = res.body;
          expect(Array.isArray(products)).toBe(true);
          expect(products).not.toHaveLength(0);
        });
    });

    it("should get a product by id", async () => {
      let expectedProduct;

      await request
        .get(routes.products.getAll)
        .expect(200)
        .then((res) => {
          const { data: products } = res.body;

          expect(Array.isArray(products)).toBe(true);
          expect(products).not.toHaveLength(0);

          expectedProduct =
            products[Math.floor(Math.random() * products.length)];
        });

      await request
        .get(routes.products.getById(expectedProduct.id))
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          const { data: product } = res.body;

          expect(product).toEqual(expectedProduct);
        });
    });
  });
});
