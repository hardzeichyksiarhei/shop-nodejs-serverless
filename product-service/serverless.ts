import type { AWS } from "@serverless/typescript";

import createProduct from "@functions/createProduct";
import getProductsList from "@functions/getProductsList";
import getProductById from "@functions/getProductById";
import updateProductById from "@functions/updateProductById";
import deleteProductById from "@functions/deleteProductById";
import catalogBatchProcess from "@functions/catalogBatchProcess";

import config from "src/config";

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
  PRODUCTS_SUBSCRIPTION_EMAIL,
  EXPENSIVE_PRODUCTS_SUBSCRIPTION_EMAIL,
} = config;

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: {
        forceInclude: ["pg", "reflect-metadata"],
      },
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
    lambdaHashingVersion: "20201221",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      PG_HOST,
      PG_PORT,
      PG_DATABASE,
      PG_USERNAME,
      PG_PASSWORD,

      PRODUCTS_SUBSCRIPTION_EMAIL,
      EXPENSIVE_PRODUCTS_SUBSCRIPTION_EMAIL,

      CREATE_PRODUCT_TOPIC_ARN: {
        Ref: "CreateProductTopic",
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sqs:ReceiveMessage",
        Resource: {
          "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
        },
      },
      {
        Effect: "Allow",
        Action: "sns:Publish",
        Resource: {
          Ref: "CreateProductTopic",
        },
      },
    ],
  },
  // import the function via paths
  functions: {
    createProduct,
    getProductsList,
    getProductById,
    updateProductById,
    deleteProductById,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "createProductTopic",
        },
      },
      CreateProductTopicSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: PRODUCTS_SUBSCRIPTION_EMAIL,
          TopicArn: {
            Ref: "CreateProductTopic",
          },
        },
      },
      CreateExpensiveProductTopicSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: EXPENSIVE_PRODUCTS_SUBSCRIPTION_EMAIL,
          TopicArn: {
            Ref: "CreateProductTopic",
          },
          FilterPolicy: {
            highestPrice: [
              {
                numeric: [">=", 100],
              },
            ],
          },
        },
      },
    },
    Outputs: {
      QueueURL: {
        Value: {
          Ref: "CatalogItemsQueue",
        },
        Export: {
          Name: {
            "Fn::Sub": "${AWS::StackName}-CatalogItemsQueueUrl",
          },
        },
      },
      QueueARN: {
        Value: {
          "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
        },
        Export: {
          Name: {
            "Fn::Sub": "${AWS::StackName}-CatalogItemsQueueArn",
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
