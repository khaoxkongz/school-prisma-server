import { DbCourseModel } from "../../prisma";
import { ICourse, ICourseWithInstuctor } from "../entities/course";
import { ITeacherWithCoursesDto } from "./teacher";

export interface ICreateCourseDto {
  name: string;
  description: string;
  start_time: string;
  duration: number;
}

export interface IUpdateCourseDto {
  description: string;
  start_time: string;
  duration: number;
}

export interface ICourseWithInstructorDto extends ICourseDto {
  instructor: Omit<ITeacherWithCoursesDto, "courses">;
}

export interface ICourseDto
  extends Omit<DbCourseModel, "instructor" | "instructorId" | "createdAt" | "updatedAt" | "start_time"> {
  createdAt: string;
  updatedAt: string;
  start_time: string;
}

const tranformDataModelToCourseWithInstructorDto = (data: ICourseWithInstuctor): ICourseWithInstructorDto => {
  const { createdAt, updatedAt, start_time, instructor, ...courseInfo } = data;
  const { createdAt: teacherCreatedAt, ...teacherInfo } = instructor;
  return {
    ...courseInfo,
    start_time: start_time.toISOString(),
    instructor: {
      ...teacherInfo,
      createdAt: teacherCreatedAt.toISOString(),
    },
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
};

const tranfromDataModelArraToArrayOfCourseWithInstructorDto = (
  data: ICourseWithInstuctor[]
): ICourseWithInstructorDto[] => {
  return data.map((dat) => tranformDataModelToCourseWithInstructorDto(dat));
};

const tranformToCoursesDto = (data: ICourse): ICourseDto => {
  const { createdAt, updatedAt, start_time, ...courseInfo } = data;
  return {
    ...courseInfo,
    start_time: start_time.toISOString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
};

const tranformDataModelArrayToArrayOfCoursesDto = (data: ICourse[]): ICourseDto[] => {
  return data.map((dat) => tranformToCoursesDto(dat));
};

export default {
  tranformDataModelToCourseWithInstructorDto,
  tranfromDataModelArraToArrayOfCourseWithInstructorDto,
  tranformDataModelArrayToArrayOfCoursesDto,
};
