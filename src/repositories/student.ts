import { PrismaClient } from "@prisma/client";
import { ICreateStudent, IStudent, IStudentWithClassroom } from "../entities";

export interface IRepositoryStudent {
  createStudent(arg: ICreateStudent): Promise<IStudent>;
  getStudents(): Promise<IStudent[]>;
  getStudentById(id: number): Promise<IStudentWithClassroom | null>;
  setClubs(id: number, clubsIds: number[]): Promise<IStudent>;
  deleteStudentById(id: number): Promise<IStudent>;
}

export function newRepositoryStudent(db: PrismaClient): IRepositoryStudent {
  return new RepositoryStudent(db);
}

class RepositoryStudent implements IRepositoryStudent {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async createStudent(arg: ICreateStudent): Promise<IStudent> {
    return await this.db.student.create({
      data: {
        fullname: arg.fullname,
        // Connect classroom
        classroom: {
          connect: {
            id: arg.classId,
          },
        },
        // Connect clubs
        clubs: {
          // connect: [{ id: 1}, {id: 2}]
          connect: arg.clubsIds?.map((clubsId) => {
            return { id: clubsId };
          }),
        },
      },
    });
  }

  public async getStudents(): Promise<IStudent[]> {
    return await this.db.student.findMany();
  }

  public async getStudentById(id: number): Promise<IStudentWithClassroom | null> {
    return await this.db.student.findUnique({
      where: { id },
      include: {
        classroom: true,
        clubs: true,
      },
    });
  }

  public async deleteStudentById(id: number): Promise<IStudent> {
    return await this.db.student.delete({
      where: { id },
    });
  }

  public async setClubs(id: number, clubsIds: number[]): Promise<IStudent> {
    const connectClubs = clubsIds.map((clubsId) => {
      return { id: clubsId };
    });

    return await this.db.student.update({
      where: { id },
      data: {
        clubs: {
          // set: [{id: 1}, {id: 2}, {id: 3}]
          set: connectClubs,
        },
      },
    });
  }
}
