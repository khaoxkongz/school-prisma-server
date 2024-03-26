import { IClub, IClubWithStudents } from "../entities";

export interface IRepositoryClub {
  createClub(name: string): Promise<IClub>;
  getClubs(): Promise<IClubWithStudents[]>;
}
