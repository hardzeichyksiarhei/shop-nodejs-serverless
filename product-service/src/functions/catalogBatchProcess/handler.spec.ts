import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";

import { main } from "./handler";

jest.mock("pg", () => ({
  Client: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  })),
}));

const snsPublishMock = jest.fn();

describe("catalogBatchProcess", () => {
  beforeAll(async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("SNS", "publish", (params, cb) => {
      snsPublishMock(params);
      cb(undefined, "success");
    });
  });

  afterAll(() => {
    AWSMock.restore("SNS");
    jest.clearAllMocks();
  });

  test("should publish message", async () => {
    const eventFixture = { Records: [] };
    const result = (await main(
      eventFixture,
      null,
      null
    )) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    expect(snsPublishMock).toHaveBeenCalled();
  });

  test("should get error if products were not inserted", async () => {
    snsPublishMock.mockImplementation(() => {
      throw new Error("Products were not inserted");
    });
    const eventFixture = { Records: [] };
    const result = (await main(
      eventFixture,
      null,
      null
    )) as APIGatewayProxyResult;

    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(500);
    expect(body.code).toBe("INTERNAL_SERVER_ERROR");
    expect(body.message).toBe("Products were not inserted");
  });
});
