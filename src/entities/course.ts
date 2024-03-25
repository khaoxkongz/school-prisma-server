import { DbCourseModel, DbTeacherModel } from "../../prisma";

export interface IWhereCourse {
  courseId?: string;
}

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
  instructor: Pick<DbTeacherModel, "name">;
}
