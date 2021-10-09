import { handlerPath } from "@libs/handlerResolver";

import config from "src/config";

const { AUTHORIZATION_SERVICE_STACK_NAME } = config;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        authorizer: {
          name: "basicAuhorizer",
          arn: {
            "Fn::ImportValue": `${AUTHORIZATION_SERVICE_STACK_NAME}-BasicAuthorizerArn`,
          },
          resultTtlInSeconds: 0,
          identitySource: "method.request.header.Authorization",
        },
      },
    },
  ],
};
