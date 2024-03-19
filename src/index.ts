import { PrismaClient } from "@prisma/client";
import express from "express";

import { newRepositoryClassroom, newRepositoryClub, newRepositoryStudent } from "./repositories";
import { HandlerClassroom, HandlerClub, HandlerStudent } from "./handler";

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

  routerClassroom.post("/", handlerClassroom.createClassroom.bind(handlerClassroom));
  routerClassroom.get("/", handlerClassroom.getClassrooms.bind(handlerClassroom));

  routerStudent.post("/", handlerStudent.createStudent.bind(handlerStudent));
  routerStudent.get("/", handlerStudent.getStudents.bind(handlerStudent));
  routerStudent.get("/:id", handlerStudent.getStudentById.bind(handlerStudent));
  routerStudent.post("/clubs/:id", handlerStudent.setClubs.bind(handlerStudent));
  routerStudent.delete("/:id", handlerStudent.deleteStudentById.bind(handlerStudent));

  routerClub.post("/", handlerClub.createClub.bind(handlerClub));
  routerClub.get("/", handlerClub.getClubs.bind(handlerClub));

  server.listen(8000, () => console.log("starting server"));
}

main();
