import express, { Express, Request } from "express";

import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";

import mongoose from "mongoose";

import router from "./routes";

import authRoutes from "./routes/auth.api";
import userRoutes from "./routes/user";
import configRoutes from "./routes/configApp.api";
import groupRoutes from "./routes/groups";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

let port = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV == "test") {
  port = 0;
}

app.use("/api/v1", router);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/config", configRoutes);
app.use("/api/v1/groups", groupRoutes);

const server = app.listen(port, async () => {
  console.log(`[server]:🗄️  Server is running at http://localhost:${port}`);

  // Connect To The Database
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/work_groups");
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});

export { app, server };
