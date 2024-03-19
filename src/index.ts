import { PrismaClient } from "@prisma/client";
import express from "express";

async function main() {
  const db = new PrismaClient();
  const repoClassroom = newRepositoryClassroom(db);
  const repoStudent = newRepositoryStudent(db);
  const repoClub = newRepositoryClub(db);

  const handlerClassroom = new HandlerClassroom(repoClassroom);
  const handlerStudent = new HandlerStudent(repoStudent);
  const handlerClub = new HandlerClub(repoClub);

  const server = express();
  server.use(express.json());

  const routerClassroom = express.Router();
  const routerStudent = express.Router();
  const routerClub = express.Router();

  server.use("/classrooms", routerClassroom);
  server.use("/students", routerStudent);
  server.use("/clubs", routerClub);

  server.listen(8000, () => console.log("starting server"));
}

main();
