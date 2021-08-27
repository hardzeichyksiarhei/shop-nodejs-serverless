import { mocked } from "ts-jest/utils";
import { Handler } from "aws-lambda";

import { middyfy } from "@libs/lambda";

import { DB } from "@db/index";

jest.mock("@libs/lambda");

describe("getProductsList", () => {
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

  test("should return product list", async () => {
    const products = DB.getTable("products");
    const event = { body: {} };
    const response = await main(event);
    const body = JSON.parse(response.body);

    expect(body.data).toEqual(products);
  });
});
