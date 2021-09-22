import { handlerPath } from "@libs/handlerResolver";

import config from "src/config";

const { IMPORT_BUCKET_NAME } = config;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: IMPORT_BUCKET_NAME,
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: "uploaded/",
            suffix: ".csv",
          },
        ],
        existing: true,
      },
    },
  ],
};
