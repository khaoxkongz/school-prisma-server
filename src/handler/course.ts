import { IRepositoryCourse } from "../interfaces/course";
import { IHandlerCourse } from "../routes/course";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import mapperCourse from "../dto/course";
import { DURATION_LIMIT_IN_SECONDS } from "../utils/const";

class HandlerCourse implements IHandlerCourse {
  private repo: IRepositoryCourse;

  constructor(repo: IRepositoryCourse) {
    this.repo = repo;
  }

  public createOneCourse: IHandlerCourse["createOneCourse"] = async (req, res) => {
    const { name, description, duration, start_time } = req.body;
    const { userId, username } = res.locals.payload;

    // Validate duration is a number
    if (typeof duration !== "number") {
      return res.status(400).json({ message: "Duration is not a number" }).end();
    }

    // Validate duration is a number
    if (isNaN(duration)) {
      return res.status(400).json({ message: "Duration is not a number" }).end();
    }

    // Validate duration length is more than limit (8hrs)
    if (duration > DURATION_LIMIT_IN_SECONDS) {
      return res.status(400).json({ message: "Duration is more than linited (8 hrs)" }).end();
    }

    // Validate type start_time
    if (typeof start_time !== "string") {
      return res.status(400).json({ message: "start_time is not a string" });
    }

    // Validate start_time
    const isValidDate = !isNaN(Date.parse(start_time));

    if (!isValidDate) {
      return res.status(400).json({ message: "start_time is incorrect date format" });
    }

    // Check if start_time is in the future
    const startTimeDate = new Date(start_time);
    const now = new Date();

    if (startTimeDate < now) {
      return res.status(400).json({ message: "start_time must be in the future" });
    }

    // Validate name
    if (typeof name !== "string") {
      return res.status(400).json({ message: "name is not a string" });
    }

    if (name.length <= 0) {
      return res.status(400).json({ message: "name can not be empty string" });
    }

    // validate description
    if (typeof description !== "string") {
      return res.status(400).json({ message: "description is not a string" });
    }

    if (description.length <= 0) {
      return res.status(400).json({ message: "description can not be empty string" });
    }

    return await this.repo
      .createOne({ id: userId, username }, { name, description, duration, start_time: startTimeDate })
      .then((data) => {
        return res.status(201).json(mapperCourse.tranformDataModelToCourseWithInstructorDto(data)).end();
      })
      .catch((error) => {
        const errMsg = `failed to create course with coure name ${name}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" });
      });
  };

  public getAllCourses: IHandlerCourse["getAllCourses"] = async (_req, res) => {
    return await this.repo
      .getAllCourses()
      .then((data) => {
        return res.status(200).json(mapperCourse.tranfromDataModelArraToArrayOfCourseWithInstructorDto(data));
      })
      .catch((error) => {
        const errMsg = `failed to retrieve all course data`;
        console.error(`${errMsg}: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  };

  public getOneCourseById: IHandlerCourse["getOneCourseById"] = async (req, res) => {
    const { id: courseId } = req.params;
    return await this.repo
      .getCourseById({ courseId })
      .then((data) => {
        return res.status(200).json(mapperCourse.tranformDataModelToCourseWithInstructorDto(data)).end();
      })
      .catch((error) => {
        const errMsg = `failed to retrieve data with course id ${courseId}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" });
      });
  };

  public updateOneCourseById: IHandlerCourse["updateOneCourseById"] = async (req, res) => {
    const { id: courseId } = req.params;
    const { description, duration, start_time } = req.body;
    const { userId } = res.locals.payload;

    const { instructorId } = await this.repo.getCourseById({ courseId });

    if (userId !== instructorId) {
      return res.status(400).json({ error: "this content is forbidden" }).end();
    }

    return await this.repo
      .updateCourseById(
        { courseId },
        {
          description,
          duration,
          start_time: new Date(start_time),
        }
      )
      .then((data) => {
        return res.status(200).json(mapperCourse.tranformDataModelToCourseWithInstructorDto(data)).end();
      })
      .catch((error) => {
        const errMsg = `failed to retrieve course data with course id ${courseId}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" });
      });
  };

  public deleteOneCourseById: IHandlerCourse["deleteOneCourseById"] = async (req, res) => {
    const { id: courseId } = req.params;
    const { userId } = res.locals.payload;

    const { instructorId } = await this.repo.getCourseById({ courseId });

    if (userId !== instructorId) {
      return res.status(400).json({ error: "this content is forbidden" }).end();
    }

    return await this.repo
      .deleteCourseById({ courseId })
      .then((data) => {
        return res.status(200).json(mapperCourse.tranformDataModelToCourseWithInstructorDto(data)).end();
      })
      .catch((error) => {
        const errMsg = `failed to retrieve course data with course id ${courseId}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" });
      });
  };
}

export { HandlerCourse };
