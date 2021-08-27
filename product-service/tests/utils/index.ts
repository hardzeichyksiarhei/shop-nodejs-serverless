import supertest from "supertest";

import { routes } from "./routes";

const host = "localhost:3000";

const request = supertest(host);

export { request, routes };
