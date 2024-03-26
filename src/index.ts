import "dotenv/config";
import express from "express";

import router from "./routes/root-routes";

import { PORT } from "./utils/config";

const main = async () => {
  const server = express();
  server.use(express.json());

  server.use("/", router);

  server.listen(PORT, () => console.log(`Express server is up at ${PORT}`));
};

main();
