import express from "express";
import { handlerTeacher, jwtMiddleware } from "../bootstrap";
import type { RequestHandler } from "express";

import { Empty, ErrorReason } from "../dto/utils.type";
import { AuthStatus } from "../dto/auth";

import {
  ICreateTeacherDto,
  ILoginDto,
  ILoginResultDto,
  ITeacherWithCoursesDto,
  ITeacherWithOutPasswordDto,
} from "../dto/teacher";

export interface IHandlerTeacher {
  register: RequestHandler<Empty, ITeacherWithOutPasswordDto | ErrorReason, ICreateTeacherDto>;
  login: RequestHandler<Empty, ILoginResultDto, ILoginDto>;
  getTecherInfo: RequestHandler<Empty, ITeacherWithCoursesDto | ErrorReason, unknown, unknown, AuthStatus>;
}

const routerTeacher = express.Router();

routerTeacher.route("/login").post(handlerTeacher.login);
routerTeacher.route("/register").post(handlerTeacher.register);

routerTeacher.use(jwtMiddleware.auth);
routerTeacher.route("/me").get(handlerTeacher.getTecherInfo);

export default routerTeacher;
