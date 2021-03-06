import type { AWS } from "@serverless/typescript";
import { GatewayResponseType } from "aws-sdk/clients/apigateway";

import importProductsFile from "@functions/importProductsFile";
import importFileParser from "@functions/importFileParser";

import config from "src/config";

const {
  IMPORT_BUCKET_NAME,
  IMPORT_BUCKET_ARN,
  REGION,
  PRODUCT_SERVICE_STACK_NAME,
} = config;

const enableGatewayResponseCors = (responseType: GatewayResponseType) => {
  return {
    Type: "AWS::ApiGateway::GatewayResponse",
    Properties: {
      RestApiId: {
        Ref: "ApiGatewayRestApi",
      },
      ResponseParameters: {
        "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
        "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
      },
      ResponseType: responseType,
    },
  };
};

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-3",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      IMPORT_BUCKET_NAME,
      IMPORT_BUCKET_ARN,
      REGION,
      CATALOG_ITEMS_QUEUE_URL: {
        "Fn::ImportValue": `${PRODUCT_SERVICE_STACK_NAME}-CatalogItemsQueueUrl`,
      },
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: IMPORT_BUCKET_ARN,
      },
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: `${IMPORT_BUCKET_ARN}/*`,
      },
      {
        Effect: "Allow",
        Action: "sqs:SendMessage",
        Resource: {
          "Fn::ImportValue": `${PRODUCT_SERVICE_STACK_NAME}-CatalogItemsQueueArn`,
        },
      },
    ],
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  resources: {
    Resources: {
      UploadBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: IMPORT_BUCKET_NAME,
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedOrigins: ["*"],
                AllowedHeaders: ["*"],
                AllowedMethods: ["PUT"],
              },
            ],
          },
        },
      },
      UploadBucketPolicy: {
        Type: "AWS::S3::BucketPolicy",
        Properties: {
          Bucket: IMPORT_BUCKET_NAME,
          PolicyDocument: {
            Statement: [
              {
                Action: "s3:*",
                Effect: "Allow",
                Resource: `${IMPORT_BUCKET_ARN}/*`,
                Principal: {
                  AWS: "*",
                },
              },
            ],
          },
        },
      },
      ApiGatewayRestApi: {
        Type: "AWS::ApiGateway::RestApi",
        Properties: {
          Name: {
            "Fn::Sub": "${AWS::StackName}",
          },
        },
      },
      ResponseUnauthorized: enableGatewayResponseCors("UNAUTHORIZED"),
      ResponseAccessDenied: enableGatewayResponseCors("ACCESS_DENIED"),
    },
  },
};

module.exports = serverlessConfiguration;
