import express, { Express, Request } from "express";

import cors from "cors";
import bodyParser from "body-parser";

import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

let port = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV == "test") {
  port = 0;
}

app.use("/api/v1", router);

const server = app.listen(port, async () => {
  console.log(`[server]:🗄️  Server is running at http://localhost:${port}`);
});

export { app, server };
