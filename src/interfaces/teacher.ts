import { ICreateTeacher, ITeacherWithCourse, ITeacherWithOutPassword, IWhereTeacher } from "../entities/teacher";

export interface IRepositoryTeacher {
  createOne(data: ICreateTeacher): Promise<ITeacherWithOutPassword>;
  findUnique(where: IWhereTeacher): Promise<ITeacherWithCourse>;
}
