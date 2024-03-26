import { Club } from "@prisma/client";
import { IStudentWithClassroomDto } from "./student";

export interface IClubsDto extends Club {}

export interface ICreateClubDto {
  name: string;
}

export interface IClubWithStudentsDto extends Club {
  students: IStudentWithClassroomDto[];
}
