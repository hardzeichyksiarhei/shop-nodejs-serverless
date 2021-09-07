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
  useDotenv: true,
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
