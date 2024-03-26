import "dotenv/config";

import express from "express";
import postgres from "../prisma";

import { PORT } from "./utils/config";

import { newRepositoryClassroom, newRepositoryClub, newRepositoryStudent } from "./repositories";
import { HandlerClassroom, HandlerClub, HandlerStudent } from "./handler";

import { RepositoryTeacher } from "./repositories/teacher";
import { RepositoryCourse } from "./repositories/course";

import { HandlerTeacher } from "./handler/teacher";
import { HandlerCourse } from "./handler/course";

import { JwtMiddleware } from "./auth/jwt";

const main = async () => {
  const repoClassroom = newRepositoryClassroom(postgres);
  const repoStudent = newRepositoryStudent(postgres);
  const repoClub = newRepositoryClub(postgres);

  const repoTeacher = new RepositoryTeacher(postgres);
  const repoCourse = new RepositoryCourse(postgres);

  const jwtMiddleware = new JwtMiddleware();

  const handlerClassroom = new HandlerClassroom(repoClassroom);
  const handlerStudent = new HandlerStudent(repoStudent);
  const handlerClub = new HandlerClub(repoClub);

  const handlerTeacher = new HandlerTeacher(repoTeacher);
  const handlerCourse = new HandlerCourse(repoCourse);

  const server = express();
  server.use(express.json());

  const routerClassroom = express.Router();
  const routerStudent = express.Router();
  const routerClub = express.Router();

  const routerTeacher = express.Router();
  const rotuerCourse = express.Router();

  server.use("/classrooms", routerClassroom);
  server.use("/students", routerStudent);
  server.use("/clubs", routerClub);

  server.use("/teacher", routerTeacher);
  server.use("/course", rotuerCourse);

  routerClassroom.post("/", handlerClassroom.createClassroom.bind(handlerClassroom));
  routerClassroom.get("/", handlerClassroom.getClassrooms.bind(handlerClassroom));

  routerStudent.post("/", handlerStudent.createStudent.bind(handlerStudent));
  routerStudent.get("/", handlerStudent.getStudents.bind(handlerStudent));
  routerStudent.get("/:id", handlerStudent.getStudentById.bind(handlerStudent));
  routerStudent.post("/clubs/:id", handlerStudent.setClubs.bind(handlerStudent));
  routerStudent.delete("/:id", handlerStudent.deleteStudentById.bind(handlerStudent));

  routerClub.post("/", handlerClub.createClub.bind(handlerClub));
  routerClub.get("/", handlerClub.getClubs.bind(handlerClub));

  routerTeacher.post("/register", handlerTeacher.register);
  routerTeacher.post("/login", handlerTeacher.login);
  routerTeacher.get("/me", jwtMiddleware.auth, handlerTeacher.getTecherInfo);

  rotuerCourse.get("/", handlerCourse.getAllCourses);
  rotuerCourse.get("/:id", handlerCourse.getOneCourseById);

  rotuerCourse.use(jwtMiddleware.auth);

  rotuerCourse.post("/", handlerCourse.createOneCourse);
  rotuerCourse.patch("/:id", handlerCourse.updateOneCourseById);
  rotuerCourse.delete("/:id", handlerCourse.deleteOneCourseById);

  server.listen(PORT, () => console.log(`Express server is up at ${PORT}`));
};

main();
