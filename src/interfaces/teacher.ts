import { DbTeacherModel } from "../../prisma";
import { ICreateTeacher, ITeacherWithOutPassword, IWhereTeacher } from "../entities/teacher";

export interface IRepositoryTeacher {
  createOne(data: ICreateTeacher): Promise<ITeacherWithOutPassword>;
  findUnique(where: IWhereTeacher): Promise<DbTeacherModel>;
}
