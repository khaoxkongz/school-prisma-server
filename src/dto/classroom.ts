import { Classroom } from "@prisma/client";

export interface IClassroomDto extends Classroom {}

export interface IClassroomsDto extends Classroom {}

export interface ICreateClassroomDto {
  name: string;
}
