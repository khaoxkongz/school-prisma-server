import type { RequestHandler } from "express";

import { AuthStatus } from "../dto/auth";

import { ICourseWithInstructorDto, ICreateCourseDto, IUpdateCourseDto } from "../dto/course";
import { Empty, ErrorReason, ID } from "../dto/utils.type";

export interface IHandlerCourse {
  createOneCourse: RequestHandler<Empty, ICourseWithInstructorDto | ErrorReason, ICreateCourseDto, unknown, AuthStatus>;
  getOneCourseById: RequestHandler<ID, ICourseWithInstructorDto | ErrorReason>;
  getAllCourses: RequestHandler<Empty, ICourseWithInstructorDto[] | ErrorReason>;
  updateOneCourseById: RequestHandler<ID, ICourseWithInstructorDto | ErrorReason, IUpdateCourseDto, unknown, AuthStatus>;
  deleteOneCourseById: RequestHandler<ID, ICourseWithInstructorDto | ErrorReason, unknown, unknown, AuthStatus>;
}
