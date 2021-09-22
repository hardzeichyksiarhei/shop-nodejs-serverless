import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { main } from "./handler";

describe("importProductsFile", () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("S3", "getSignedUrl", (_, { Key }, cb) => {
      const signedUrl = `https://aws-s3-url/${Key}`;
      cb(null, signedUrl);
    });
  });

  afterAll(() => {
    AWSMock.restore("S3");
  });

  test("should get a correct signed URL [success]", async () => {
    const name = "test.csv";
    const event = {
      queryStringParameters: { name },
    } as unknown as APIGatewayProxyEvent;

    const expectedKey = `uploaded/${name}`;
    const expectedSignedUrl = `https://aws-s3-url/${expectedKey}`;
    const lambdaResponse: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({ signedUrl: expectedSignedUrl }),
    };
    const response = (await main(event, null, null)) as APIGatewayProxyResult;

    expect(response.body).toBe(lambdaResponse.body);
  });
});
