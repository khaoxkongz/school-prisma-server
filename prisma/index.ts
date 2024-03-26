import { Prisma, PrismaClient as DbDriver, Teacher, Course } from "@prisma/client";

export type CourseDb = Prisma.CourseDelegate;
export type TeacherDb = Prisma.TeacherDelegate;

export type DbCourseModel = Course;
export type DbTeacherModel = Teacher;

export { DbDriver };

export default new DbDriver();
