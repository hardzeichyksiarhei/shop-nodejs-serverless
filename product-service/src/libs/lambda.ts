import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import middyJsonBodyParser from "@middy/http-json-body-parser";

export const middyfy = (handler) => {
  return middy(handler).use(httpEventNormalizer()).use(middyJsonBodyParser());
};
