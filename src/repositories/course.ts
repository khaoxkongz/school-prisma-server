import { DbDriver } from "../../prisma";
import { ICourseWithInstuctor, IWhereCourse, IUpdateCourse, ICreateCourse } from "../entities/course";
import { IWhereTeacher } from "../entities/teacher";
import { IRepositoryCourse } from "../interfaces/course";

import modelCourse from "../models/course";

class RepositoryCourse implements IRepositoryCourse {
  private db: DbDriver;

  constructor(db: DbDriver) {
    this.db = db;
  }

  public createOne = async (where: IWhereTeacher, data: ICreateCourse): Promise<ICourseWithInstuctor> => {
    return await this.db.course.create({
      data: modelCourse.fromWhereTeacherToCreateOne(where, data),
      include: modelCourse.includeTeacherModel(),
    });
  };

  public getAllCourses = async (): Promise<ICourseWithInstuctor[]> => {
    return await this.db.course.findMany({
      include: modelCourse.includeTeacherModel(),
    });
  };

  public getCourseById = async (where: IWhereCourse): Promise<ICourseWithInstuctor> => {
    return await this.db.course.findUniqueOrThrow({
      where: modelCourse.fromWhereCourseToGetOne(where),
      include: modelCourse.includeTeacherModel(),
    });
  };

  public deleteCourseById = async (where: IWhereCourse): Promise<ICourseWithInstuctor> => {
    return await this.db.course.delete({
      where: modelCourse.fromWhereCourseToGetOne(where),
      include: modelCourse.includeTeacherModel(),
    });
  };

  public updateCourseById = async (where: IWhereCourse, data: IUpdateCourse): Promise<ICourseWithInstuctor> => {
    return await this.db.course.update({
      where: modelCourse.fromWhereCourseToGetOne(where),
      data: modelCourse.fromDataDtoToUpdateOne(data),
      include: modelCourse.includeTeacherModel(),
    });
  };
}

export { RepositoryCourse };
