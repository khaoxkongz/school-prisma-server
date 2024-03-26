import { DbDriver } from "../../prisma";
import { ICreateTeacher, ITeacherWithCourse, ITeacherWithOutPassword, IWhereTeacher } from "../entities/teacher";
import { IRepositoryTeacher } from "../interfaces/teacher";

import modelTeacher from "../models/teacher";

class RepositoryTeacher implements IRepositoryTeacher {
  private db: DbDriver;

  constructor(db: DbDriver) {
    this.db = db;
  }

  public createOne = async (data: ICreateTeacher): Promise<ITeacherWithOutPassword> => {
    return await this.db.teacher.create({
      data: modelTeacher.toCreateTeacherDataFromDto(data),
      select: modelTeacher.defaultTeacherSelected(),
    });
  };

  public findUnique = async (where: IWhereTeacher): Promise<ITeacherWithCourse> => {
    return await this.db.teacher.findUniqueOrThrow({
      where: modelTeacher.fromUniqueDataToTeacher(where),
      include: modelTeacher.includeCoursesModel(),
    });
  };
}

export { RepositoryTeacher };
