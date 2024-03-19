import { IClassroom, IClub, IStudent } from ".";

// export type IStudentWithClassroom = IStudent & IClassroom;

export interface IStudentWithClassroom extends IStudent {
  classroom: IClassroom;
}

export interface IFullStudent extends IStudentWithClassroom {
  clubs: IClub[];
}

export interface IClubWithStudents extends IClub {
  students: IStudentWithClassroom[];
}
