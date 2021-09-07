import type { AWS } from "@serverless/typescript";

import createProduct from "@functions/createProduct";
import getProductsList from "@functions/getProductsList";
import getProductById from "@functions/getProductById";
import deleteProductById from "@functions/deleteProductById";

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

      // PG_HOST: "hardz-shop.cm2lwxoyppa7.eu-west-3.rds.amazonaws.com",
      // PG_PORT: "5432",
      // PG_DATABASE: "hardz_shop",
      // PG_USERNAME: "postgres",
      // PG_PASSWORD: "rxuxTDkyYhfrU8mLyL8K",

      PG_HOST: "localhost",
      PG_PORT: "5432",
      PG_DATABASE: "hardz_shop",
      PG_USERNAME: "postgres",
      PG_PASSWORD: "4804",
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
