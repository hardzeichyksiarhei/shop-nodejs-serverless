import type { AWS } from "@serverless/typescript";

import createProduct from "@functions/createProduct";
import getProductsList from "@functions/getProductsList";
import getProductById from "@functions/getProductById";
import deleteProductById from "@functions/deleteProductById";

import config from "src/config";

const { PG_HOST, PG_PORT, PG_USERNAME, PG_DATABASE, PG_PASSWORD } = config;

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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",

      PG_HOST: PG_HOST,
      PG_PORT: PG_PORT,
      PG_DATABASE: PG_USERNAME,
      PG_USERNAME: PG_DATABASE,
      PG_PASSWORD: PG_PASSWORD,
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
    createProduct,
    getProductsList,
    getProductById,
    deleteProductById,
  },
};

module.exports = serverlessConfiguration;
