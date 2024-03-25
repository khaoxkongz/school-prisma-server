import { DbTeacherModel, TeacherDb } from "../../prisma";
import { ICreateTeacher, ITeacherWithOutPassword, IWhereTeacher } from "../entities/teacher";
import { IRepositoryTeacher } from "../interfaces/teacher";

import modelTeacher from "../models/teacher";

class RepositoryTeacher implements IRepositoryTeacher {
  private db: TeacherDb;

  constructor(db: TeacherDb) {
    this.db = db;
  }

  public createOne = async (data: ICreateTeacher): Promise<ITeacherWithOutPassword> => {
    return await this.db.create({
      data: modelTeacher.toCreateTeacherDataFromDto(data),
      select: modelTeacher.defaultTeacherSelected(),
    });
  };

  public findUnique = async (where: IWhereTeacher): Promise<DbTeacherModel> => {
    return await this.db.findUniqueOrThrow({
      where: modelTeacher.fromUniqueDataToTeacher(where),
    });
  };
}

export { RepositoryTeacher };
