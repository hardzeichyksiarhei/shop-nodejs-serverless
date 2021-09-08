// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// import { main } from "./handler";

// import { DB } from "@db/";

// type APIGatewayProxyEventWithPathParameters = APIGatewayProxyEvent & {
//   pathParameters: { productId: string };
// };

// describe("getProductById", () => {
//   test("should get a board by id [success]", async () => {
//     const products = DB.getTable("products");
//     const product = products[Math.floor(Math.random() * products.length)];
//     const event = {
//       pathParameters: { productId: product.id },
//     } as APIGatewayProxyEventWithPathParameters;
//     const response = (await main(event, null, null)) as APIGatewayProxyResult;
//     const body = JSON.parse(response.body);
//     expect(body).toEqual(product);
//   });

//   test("should get a board by id [not found]", async () => {
//     const event = {
//       pathParameters: { productId: "test" },
//     } as APIGatewayProxyEventWithPathParameters;
//     const response = (await main(event, null, null)) as APIGatewayProxyResult;
//     const body = JSON.parse(response.body);
//     expect(body.code).toEqual("PRODUCT_NOT_FOUND");
//   });
// });
