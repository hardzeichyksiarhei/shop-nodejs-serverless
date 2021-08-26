import "source-map-support/register";

import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import { Product } from "../../models";

const getProductList = async () => {
  const products = Product.getAll();
  console.log(products);

  return formatJSONResponse({ products });
};

export const main = middyfy(getProductList);
