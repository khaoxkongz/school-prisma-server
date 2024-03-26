import type { RequestHandler } from "express";

import { Empty, ErrorReason } from "../dto/utils.type";
import { AuthStatus } from "../dto/auth";

import { ICreateTeacherDto, ILoginDto, ILoginResultDto, ITeacherWithCoursesDto, ITeacherWithOutPasswordDto } from "../dto/teacher";

export interface IHandlerTeacher {
  register: RequestHandler<Empty, ITeacherWithOutPasswordDto | ErrorReason, ICreateTeacherDto>;
  login: RequestHandler<Empty, ILoginResultDto, ILoginDto>;
  getTecherInfo: RequestHandler<Empty, ITeacherWithCoursesDto | ErrorReason, unknown, unknown, AuthStatus>;
}
