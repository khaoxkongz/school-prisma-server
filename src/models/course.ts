import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ICreateCourse, IUpdateCourse, IWhereCourse } from "../entities/course";
import { IWhereTeacher } from "../entities/teacher";

const fromWhereCourseToGetOne = (where: IWhereCourse): Prisma.CourseWhereUniqueInput => {
  return { id: where.courseId };
};

const fromDataDtoToUpdateOne = (data: IUpdateCourse): Prisma.CourseUpdateInput => {
  const { description, duration, start_time } = data;
  return { description, duration, start_time };
};

const includeTeacherModel = (): Prisma.CourseInclude<DefaultArgs> => {
  return {
    instructor: {
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
      },
    },
  };
};

const fromWhereTeacherToCreateOne = (where: IWhereTeacher, data: ICreateCourse): Prisma.CourseCreateInput => {
  const { id } = where;
  const { name, description, duration, start_time } = data;
  return {
    name,
    description,
    duration,
    start_time,
    instructor: {
      connect: {
        id: id,
      },
    },
  };
};

export default { fromWhereCourseToGetOne, includeTeacherModel, fromDataDtoToUpdateOne, fromWhereTeacherToCreateOne };
