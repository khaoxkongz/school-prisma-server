import { PrismaClient } from "@prisma/client";

import { IClub, IClubWithStudents } from "../entities";

export interface IRepositoryClub {
  createClub(name: string): Promise<IClub>;
  getClubs(): Promise<IClubWithStudents[]>;
}

export function newRepositoryClub(db: PrismaClient): IRepositoryClub {
  return new RepositoryClub(db);
}

class RepositoryClub implements IRepositoryClub {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async createClub(name: string): Promise<IClub> {
    return await this.db.club.create({ data: { name } }).catch((err) => Promise.reject(`failed to create club: ${err}`));
  }

  public async getClubs(): Promise<IClubWithStudents[]> {
    return await this.db.club
      .findMany({
        include: {
          students: {
            include: {
              classroom: true,
            },
          },
        },
      })
      .catch((err) => Promise.reject(`failed to get club: ${err}`));
  }
}
