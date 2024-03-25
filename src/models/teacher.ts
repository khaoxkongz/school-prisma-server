import { Prisma } from "@prisma/client";
import { ICreateTeacher, IWhereTeacher } from "../entities/teacher";

const toCreateTeacherDataFromDto = (data: ICreateTeacher): Prisma.TeacherCreateInput => {
  const { name, username, password } = data;
  return { name, username, password };
};

const defaultTeacherSelected = () => {
  return { id: true, name: true, username: true, createdAt: true };
};

const fromUniqueDataToTeacher = (where: IWhereTeacher) => {
  const { id, username } = where;
  return { id, username };
};

export default { toCreateTeacherDataFromDto, defaultTeacherSelected, fromUniqueDataToTeacher };
