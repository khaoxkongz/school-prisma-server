import { DbTeacherModel } from "../../prisma";
import { ICourse } from "./course";

export interface IWhereTeacher {
  id?: string;
  username?: string;
}

export interface ICreateTeacher {
  name: string;
  username: string;
  password: string;
}

export interface ITeacherWithOutPassword extends Pick<DbTeacherModel, "id" | "name" | "username" | "createdAt"> {}

export interface ITeacherWithCourse extends DbTeacherModel {
  courses: ICourse[];
}
