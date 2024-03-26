import { DbDriver } from "../../prisma";
import { ICreateStudent, IStudent, IStudentWithClassroom } from "../entities";
import { IRepositoryStudent } from "../interfaces/student";

import studentModel from "../models/student";

class RepositoryStudent implements IRepositoryStudent {
  private db: DbDriver;

  constructor(db: DbDriver) {
    this.db = db;
  }

  public async createStudent(data: ICreateStudent): Promise<IStudent> {
    return await this.db.student.create({
      data: studentModel.tranformDataDtoToCreateDataModel(data),
    });
  }

  public async getStudents(): Promise<IStudent[]> {
    return await this.db.student.findMany();
  }

  public async getStudentById(id: number): Promise<IStudentWithClassroom | null> {
    return await this.db.student.findUniqueOrThrow({
      where: { id },
      include: studentModel.includeClassroomAndClubs(),
    });
  }

  public async deleteStudentById(id: number): Promise<IStudent> {
    return await this.db.student.delete({
      where: { id },
    });
  }

  public async setClubs(id: number, clubsIds: number[]): Promise<IStudent> {
    return await this.db.student.update({
      where: { id },
      data: studentModel.tranformDataToSetAndConnectClubs(clubsIds),
    });
  }
}

export { RepositoryStudent };
