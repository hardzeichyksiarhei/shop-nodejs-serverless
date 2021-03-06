import type { AWS } from "@serverless/typescript";

import basicAuthorizer from "@functions/basicAuthorizer";

const serverlessConfiguration: AWS = {
  service: "authorization-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-dotenv-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "eu-west-3",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { basicAuthorizer },
  resources: {
    Resources: {},
    Outputs: {
      BasicAuthorizerLambdaFunctionQualifiedArn: {
        Export: {
          Name: {
            "Fn::Sub": "${AWS::StackName}-BasicAuthorizerArn",
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
