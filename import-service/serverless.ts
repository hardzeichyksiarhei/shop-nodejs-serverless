import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

import config from "src/config";

const { IMPORT_BUCKET_NAME, IMPORT_BUCKET_ARN } = config;

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
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
    ],
  },
  // import the function via paths
  functions: { hello },
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
                AllowedMethods: ["POST", "PUT"],
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
    },
  },
};

module.exports = serverlessConfiguration;
