import { CourseDb, DbCourseModel } from "../../prisma";
import { ICourseWithInstuctor, IWhereCourse, IUpdateCourse, ICreateCourse } from "../entities/course";
import { IWhereTeacher } from "../entities/teacher";
import { IRepositoryCourse } from "../interfaces/course";

import modelCourse from "../models/course";

class CourseRepository implements IRepositoryCourse {
  private db: CourseDb;

  constructor(db: CourseDb) {
    this.db = db;
  }

  public createOne = async (where: IWhereTeacher, data: ICreateCourse): Promise<DbCourseModel> => {
    return await this.db.create({
      data: modelCourse.fromWhereTeacherToCreateOne(where, data),
    });
  };

  public getAllCourses = async (): Promise<ICourseWithInstuctor[]> => {
    return await this.db.findMany({
      include: modelCourse.includeTeacherModel(),
    });
  };

  public getCourseById = async (where: IWhereCourse): Promise<ICourseWithInstuctor> => {
    return await this.db.findUniqueOrThrow({
      where: modelCourse.fromWhereCourseToGetOne(where),
      include: modelCourse.includeTeacherModel(),
    });
  };

  public deleteCourseById = async (where: IWhereCourse): Promise<DbCourseModel> => {
    return await this.db.delete({
      where: modelCourse.fromWhereCourseToGetOne(where),
    });
  };

  public updateCourseById = async (where: IWhereCourse, data: IUpdateCourse): Promise<DbCourseModel> => {
    return await this.db.update({
      where: modelCourse.fromWhereCourseToGetOne(where),
      data: modelCourse.fromDataDtoToUpdateOne(data),
    });
  };
}

export { CourseRepository };
