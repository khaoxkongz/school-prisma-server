import postgres from "../../prisma";

import { JwtMiddleware } from "../auth/jwt";

import { RepositoryClassroom, RepositoryClub, RepositoryStudent } from "../repositories";
import { HandlerClassroom, HandlerClub, HandlerStudent } from "../handler";

import { RepositoryTeacher } from "../repositories/teacher";
import { RepositoryCourse } from "../repositories/course";

import { HandlerTeacher } from "../handler/teacher";
import { HandlerCourse } from "../handler/course";

export const repoClassroom = new RepositoryClassroom(postgres);
export const repoStudent = new RepositoryStudent(postgres);
export const repoClub = new RepositoryClub(postgres);

export const repoTeacher = new RepositoryTeacher(postgres);
export const repoCourse = new RepositoryCourse(postgres);

export const handlerClassroom = new HandlerClassroom(repoClassroom);
export const handlerStudent = new HandlerStudent(repoStudent);
export const handlerClub = new HandlerClub(repoClub);

export const handlerTeacher = new HandlerTeacher(repoTeacher);
export const handlerCourse = new HandlerCourse(repoCourse);

export const jwtMiddleware = new JwtMiddleware();
