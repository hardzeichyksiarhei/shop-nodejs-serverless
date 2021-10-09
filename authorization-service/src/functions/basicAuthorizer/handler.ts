import "source-map-support/register";
import {
  APIGatewayAuthorizerHandler,
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";

import { middyfy } from "@libs/lambda";

const getCredentialsFromToken = (token: string) => {
  const encodedCreds = token.split(" ").pop();
  const [username, password] = Buffer.from(encodedCreds, "base64")
    .toString("utf-8")
    .split(":");
  return { username, password };
};

const isFindUserByCredentials = (username: string, password: string) => {
  return process.env[username] && process.env[username] === password;
};

const getResourceEffect = (authorizationToken: string): "Allow" | "Deny" => {
  const { username, password } = getCredentialsFromToken(authorizationToken);
  console.log(`username: ${username} password: ${password}`);

  const isValidCredentials = isFindUserByCredentials(username, password);

  return isValidCredentials ? "Allow" : "Deny";
};

const generatePolicy = (
  authorizationToken: string,
  resourceArn: string
): APIGatewayAuthorizerResult => {
  const principalId = authorizationToken.replace(/.+\s/, "");
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: getResourceEffect(authorizationToken),
          Resource: resourceArn,
        },
      ],
    },
  };
};

const basicAuthorizer: APIGatewayAuthorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent
) => {
  if (event.type !== "TOKEN") throw new Error("Unauthorized");

  try {
    const { authorizationToken, methodArn } = event;
    return generatePolicy(authorizationToken, methodArn);
  } catch (e) {
    throw new Error(`Unauthorized: ${e.message}`);
  }
};

export const main = middyfy(basicAuthorizer);
