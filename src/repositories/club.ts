import { DbDriver } from "../../prisma";

import { IClub, IClubWithStudents } from "../entities";
import { IRepositoryClub } from "../interfaces/club";

import modelClubs from "../models/clubs";

class RepositoryClub implements IRepositoryClub {
  private db: DbDriver;

  constructor(db: DbDriver) {
    this.db = db;
  }

  public async createClub(name: string): Promise<IClub> {
    return await this.db.club.create({ data: { name } });
  }

  public async getClubs(): Promise<IClubWithStudents[]> {
    return await this.db.club.findMany({
      include: modelClubs.includeStudentWithClassroom(),
    });
  }
}

export { RepositoryClub };
