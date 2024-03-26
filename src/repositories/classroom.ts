import { DbDriver } from "../../prisma";
import { IClassroom } from "../entities";
import { IRepositoryClassroom } from "../interfaces/classroom";

class RepositoryClassroom implements IRepositoryClassroom {
  private db: DbDriver;

  constructor(db: DbDriver) {
    this.db = db;
  }

  public async createClassroom(name: string): Promise<IClassroom> {
    return await this.db.classroom.create({ data: { name } });
  }

  public async getClassrooms(): Promise<IClassroom[]> {
    return this.db.classroom.findMany();
  }
}

export { RepositoryClassroom };
