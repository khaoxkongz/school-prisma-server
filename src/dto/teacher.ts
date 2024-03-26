import { DbTeacherModel } from "../../prisma";
import { ITeacherWithCourse, ITeacherWithOutPassword } from "../entities/teacher";
import { ICourseDto } from "./course";
import { ErrorReason } from "./utils.type";

import mapperCourse from "../dto/course";

export interface IWhereTeacherDto {
  userId: string;
  username: string;
}

export interface ITeacherWithOutPasswordDto extends Omit<DbTeacherModel, "createdAt" | "updatedAt" | "password"> {
  createdAt: string;
}

export interface ITeacherWithCoursesDto extends ITeacherWithOutPasswordDto {
  courses: ICourseDto[];
}

export interface ILoginDto {
  username: string;
  password: string;
}

export interface ICreateTeacherDto {
  name: string;
  username: string;
  password: string;
}

export type ILoginResultDto =
  | {
      userId: string;
      username: string;
      accessToken: string;
    }
  | ErrorReason;

const toLoginTeacherDto = (data: IWhereTeacherDto, accessToken: string): ILoginResultDto => {
  const { userId, username } = data;
  return { userId, username, accessToken };
};

const toTeacherDto = (data: ITeacherWithOutPassword): ITeacherWithOutPasswordDto => {
  const { id, name, username, createdAt } = data;
  return {
    id,
    name,
    username,
    createdAt: createdAt.toISOString(),
  };
};

const tranformToTeacherWithCoursesDto = (data: ITeacherWithCourse): ITeacherWithCoursesDto => {
  const { createdAt, updatedAt, password: _, courses, ...teacherInfo } = data;
  const courseResult = mapperCourse.tranformDataModelArrayToArrayOfCoursesDto(courses);
  return {
    ...teacherInfo,
    courses: courseResult,
    createdAt: createdAt.toISOString(),
  };
};

export default { toTeacherDto, toLoginTeacherDto, tranformToTeacherWithCoursesDto };
