import { IClassroom } from "../entities";

export interface IRepositoryClassroom {
  createClassroom(name: string): Promise<IClassroom>;
  getClassrooms(): Promise<IClassroom[]>;
}
