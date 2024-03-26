import { ICourseWithInstuctor, ICreateCourse, IUpdateCourse, IWhereCourse } from "../entities/course";
import { IWhereTeacher } from "../entities/teacher";

export interface IRepositoryCourse {
  createOne(where: IWhereTeacher, data: ICreateCourse): Promise<ICourseWithInstuctor>;
  getAllCourses(): Promise<ICourseWithInstuctor[]>;
  getCourseById(where: IWhereCourse): Promise<ICourseWithInstuctor>;
  deleteCourseById(where: IWhereCourse): Promise<ICourseWithInstuctor>;
  updateCourseById(where: IWhereCourse, data: IUpdateCourse): Promise<ICourseWithInstuctor>;
}
