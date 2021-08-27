import { mocked } from "ts-jest/utils";
import { Handler } from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { DB } from "@db/index";

jest.mock("@libs/lambda");

describe("getProductById", () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    const handler = await import("./handler");
    main = handler.main;

    // jest.resetModules();
  });

  test("should get a board by id [success]", async () => {
    const products = DB.getTable("products");
    const product = products[Math.floor(Math.random() * products.length)];
    const event = { pathParameters: { productId: product.id } };
    const response = await main(event);
    const body = JSON.parse(response.body);
    expect(body.data).toEqual(product);
  });

  test("should get a board by id [not found]", async () => {
    const event = { pathParameters: { productId: "test" } };
    const response = await main(event);
    const body = JSON.parse(response.body);
    expect(body.code).toEqual("PRODUCT_NOT_FOUND");
  });
});
