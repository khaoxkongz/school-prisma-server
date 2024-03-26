import { Prisma } from "@prisma/client";
import { ICreateTeacher, IWhereTeacher } from "../entities/teacher";
import { DefaultArgs } from "@prisma/client/runtime/library";

const toCreateTeacherDataFromDto = (data: ICreateTeacher): Prisma.TeacherCreateInput => {
  const { name, username, password } = data;
  return { name, username, password };
};

const defaultTeacherSelected = (): Prisma.TeacherSelect<DefaultArgs> => {
  return { id: true, name: true, username: true, createdAt: true };
};

const fromUniqueDataToTeacher = (where: IWhereTeacher): Prisma.TeacherWhereUniqueInput => {
  const { id, username } = where;
  return { id, username };
};

const includeCoursesModel = (): Prisma.TeacherInclude<DefaultArgs> => {
  return {
    courses: {
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        start_time: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  };
};

export default { defaultTeacherSelected, fromUniqueDataToTeacher, includeCoursesModel, toCreateTeacherDataFromDto };
