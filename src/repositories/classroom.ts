import { PrismaClient } from "@prisma/client";
import { IClassroom } from "../entities";

export interface IRepositoryClassroom {
  createClassroom(name: string): Promise<IClassroom>;
  getClassrooms(): Promise<IClassroom[]>;
}

export function newRepositoryClassroom(db: PrismaClient): IRepositoryClassroom {
  return new RepositoryClassroom(db);
}

class RepositoryClassroom implements IRepositoryClassroom {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async createClassroom(name: string): Promise<IClassroom> {
    return await this.db.classroom
      .create({ data: { name } })
      .then((classroom) => classroom)
      .catch((err) => {
        return Promise.reject(`failed to create classroom: ${err}`);
      });
  }

  public async getClassrooms(): Promise<IClassroom[]> {
    return this.db.classroom.findMany();
  }
}
