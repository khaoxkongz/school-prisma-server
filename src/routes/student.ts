import express from "express";
import type { RequestHandler } from "express";

import { ICreateStudentDto, ISetClubsDto, IStudentDto, IStudentsDto } from "../dto/student";
import { Empty, ErrorReason, ID, MessageReason } from "../dto/utils.type";

import { handlerStudent } from "../bootstrap";

export interface IHandlerStudent {
  createStudent: RequestHandler<Empty, IStudentDto | ErrorReason, ICreateStudentDto>;
  getStudents: RequestHandler<Empty, IStudentsDto[] | ErrorReason>;
  getStudentById: RequestHandler<ID, IStudentDto | ErrorReason>;
  deleteStudentById: RequestHandler<ID, MessageReason | ErrorReason>;
  setClubs: RequestHandler<ID, IStudentDto | ErrorReason, ISetClubsDto>;
}

const routerStudent = express.Router();

routerStudent.route("/").post(handlerStudent.createStudent.bind(handlerStudent));

routerStudent.route("/").get(handlerStudent.getStudents.bind(handlerStudent));
routerStudent.route("/:id").get(handlerStudent.getStudentById.bind(handlerStudent));
routerStudent.route("/clubs/:id").post(handlerStudent.setClubs.bind(handlerStudent));
routerStudent.route("/:id").delete(handlerStudent.deleteStudentById.bind(handlerStudent));

export default routerStudent;
