import "source-map-support/register";

import { middyfy } from "@libs/lambda";

const basicAuthorizer = async () => {};

export const main = middyfy(basicAuthorizer);
