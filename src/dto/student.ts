import { Student } from "@prisma/client";
import { IClassroomDto } from "./classroom";

export interface IStudentDto extends Student {}

export interface IStudentsDto extends Student {}

export interface ICreateStudentDto {
  fullname: string;
  classId: string;
  clubsIds?: number[];
}

export interface ISetClubsDto {
  clubsIds: number[];
}

export interface IStudentWithClassroomDto extends Student {
  classroom: IClassroomDto;
}
