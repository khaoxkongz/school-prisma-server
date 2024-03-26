import { IRepositoryTeacher } from "../interfaces/teacher";
import { IHandlerTeacher } from "../routes/teacher";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword, verifyPassword } from "../utils/bcrypt";

import jsonwebtoken from "../auth/jwt";
import mapperTeacher from "../dto/teacher";

class HandlerTeacher implements IHandlerTeacher {
  private repo: IRepositoryTeacher;

  constructor(repo: IRepositoryTeacher) {
    this.repo = repo;
  }

  public register: IHandlerTeacher["register"] = async (req, res) => {
    const { name, username, password: plainpassword } = req.body;

    if (typeof name !== "string" || name.length < 0) {
      return res.status(400).json({ message: "this request must have field name" }).end();
    }

    if (typeof username !== "string" || username.length < 0) {
      return res.status(400).json({ message: "this request must have field username" }).end();
    }

    if (typeof plainpassword !== "string" || plainpassword.length < 0) {
      return res.status(400).json({ message: "this request must have field password" }).end();
    }

    if (!name) {
      return res.status(400).json({ message: "field name must be empty" });
    }

    if (!username) {
      return res.status(400).json({ message: "field username must be empty" });
    }

    if (!plainpassword) {
      return res.status(400).json({ message: "field password must be empty" });
    }

    return await this.repo
      .createOne({ name, username, password: hashPassword(plainpassword) })
      .then((data) => {
        res.status(201).json(mapperTeacher.toTeacherDto(data)).end();
      })
      .catch((error) => {
        const errMsg = `failed to create teacher with username ${username}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" }).end();
      });
  };

  public login: IHandlerTeacher["login"] = async (req, res) => {
    const { username: request_username, password: request_password } = req.body;

    if (typeof request_username !== "string" || request_username.length < 0) {
      return res.status(400).json({ message: "this request must have field username" }).end();
    }

    if (typeof request_password !== "string" || request_password.length < 0) {
      return res.status(400).json({ message: "this request must have field password" }).end();
    }

    if (!request_username) {
      return res.status(400).json({ message: "field username must be empty" });
    }

    if (!request_password) {
      return res.status(400).json({ message: "field password must be empty" });
    }

    return await this.repo
      .findUnique({ username: request_username })
      .then((data) => {
        const { id: userId, username, password } = data;

        if (!verifyPassword(request_password, password)) {
          return res.status(401).json({ error: "incorrect username or password" }).end();
        }

        const accessToken = jsonwebtoken.generateJWT({ userId, username });
        return res.status(200).json(mapperTeacher.toLoginTeacherDto({ userId, username }, accessToken));
      })
      .catch((error) => {
        const errMsg = `failed to login with username ${request_username}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError && (error.code = "P2025")) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" }).end();
      });
  };

  public getTecherInfo: IHandlerTeacher["getTecherInfo"] = async (req, res) => {
    const { userId, username } = res.locals.payload;

    return await this.repo
      .findUnique({ id: userId, username })
      .then((data) => {
        return res.status(200).json(mapperTeacher.tranformToTeacherWithCoursesDto(data)).end();
      })
      .catch((error) => {
        const errMsg = `failed to retrieve personal info with username ${username}`;
        console.error(`${errMsg}: ${error}`);

        if (error instanceof PrismaClientKnownRequestError && (error.code = "P2025")) {
          return res.status(400).json({ message: `${errMsg}` });
        }

        return res.status(500).json({ message: "Internal Server Error" }).end();
      });
  };
}

export { HandlerTeacher };
