import express from "express";

import type { RequestHandler } from "express";

import { AuthStatus } from "../dto/auth";

import { ICourseWithInstructorDto, ICreateCourseDto, IUpdateCourseDto } from "../dto/course";
import { Empty, ErrorReason, ID } from "../dto/utils.type";
import { handlerCourse, jwtMiddleware } from "../bootstrap";

export interface IHandlerCourse {
  createOneCourse: RequestHandler<Empty, ICourseWithInstructorDto | ErrorReason, ICreateCourseDto, unknown, AuthStatus>;
  getOneCourseById: RequestHandler<ID, ICourseWithInstructorDto | ErrorReason>;
  getAllCourses: RequestHandler<Empty, ICourseWithInstructorDto[] | ErrorReason>;
  updateOneCourseById: RequestHandler<
    ID,
    ICourseWithInstructorDto | ErrorReason,
    IUpdateCourseDto,
    unknown,
    AuthStatus
  >;
  deleteOneCourseById: RequestHandler<ID, ICourseWithInstructorDto | ErrorReason, unknown, unknown, AuthStatus>;
}

const routerCourse = express.Router();

routerCourse.route("/").get(handlerCourse.getAllCourses);
routerCourse.route("/:id").get(handlerCourse.getOneCourseById);

routerCourse.use(jwtMiddleware.auth);
routerCourse.route("/").post(handlerCourse.createOneCourse);
routerCourse.route("/:id").patch(handlerCourse.updateOneCourseById);
routerCourse.route("/:id").delete(handlerCourse.deleteOneCourseById);

export default routerCourse;
