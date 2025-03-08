import dotenv from "dotenv";
import path from "path";

async function globalSetup(config) {
  console.log(path.resolve("/config/", "test.env"));
  if (process.env.NAME == "prod") {
    dotenv.config({
      path: path.resolve("config", "test.env"),
      override: true,
    });
  }
}

module.exports = globalSetup;
