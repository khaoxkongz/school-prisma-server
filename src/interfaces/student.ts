import { ICreateStudent, IStudent, IStudentWithClassroom } from "../entities";

export interface IRepositoryStudent {
  createStudent(data: ICreateStudent): Promise<IStudent>;
  getStudents(): Promise<IStudent[]>;
  getStudentById(id: number): Promise<IStudentWithClassroom | null>;
  setClubs(id: number, clubsIds: number[]): Promise<IStudent>;
  deleteStudentById(id: number): Promise<IStudent>;
}
