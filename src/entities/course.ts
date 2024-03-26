import { DbCourseModel } from "../../prisma";
import { ITeacherWithOutPassword } from "./teacher";

export interface IWhereCourse {
  courseId?: string;
}

export interface ICourse extends Omit<DbCourseModel, "instructorId"> {}

export interface ICreateCourse {
  name: string;
  duration: number;
  start_time: Date;
  description: string;
}

export interface IUpdateCourse {
  duration?: number;
  start_time?: Date;
  description?: string;
}

export interface ICourseWithInstuctor extends DbCourseModel {
  instructor: ITeacherWithOutPassword;
}
