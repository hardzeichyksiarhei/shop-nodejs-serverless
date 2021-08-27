import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { main } from "./handler";

import { DB } from "@db/index";

describe("getProductsList", () => {
  test("should return product list", async () => {
    const products = DB.getTable("products");

    const event = { body: {} } as APIGatewayProxyEvent;
    const response = (await main(event, null, null)) as APIGatewayProxyResult;
    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data).toEqual(products);
  });
});