import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IRepositoryStudent } from "../interfaces/student";
import { IHandlerStudent } from "../routes/student";

export class HandlerStudent {
  private repo: IRepositoryStudent;

  constructor(repo: IRepositoryStudent) {
    this.repo = repo;
  }

  public createStudent: IHandlerStudent["createStudent"] = async (req, res) => {
    const { fullname, classId, clubsIds } = req.body;
    if (!fullname || !classId) {
      return res.status(400).json({ error: "missing fullname or classId in body" }).end();
    }

    if (fullname !== "string" || fullname.length < 0) {
      return res.status(400).json({ error: "fullname must be empty" }).end();
    }

    const numericClassId = Number(classId);

    if (isNaN(numericClassId)) {
      return res.status(400).json({ error: "classId is not a number" }).end();
    }

    return this.repo
      .createStudent({ fullname, classId: numericClassId, clubsIds })
      .then((student) => res.status(201).json(student).end())
      .catch((err) => {
        const errMsg = `failed to create student ${fullname}`;
        console.error(`${errMsg}: ${err}`);

        if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
          return res.status(400).json({ error: errMsg });
        }

        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };

  public getStudents: IHandlerStudent["getStudents"] = async (req, res) => {
    return this.repo
      .getStudents()
      .then((students) => res.status(200).json(students).end())
      .catch((err) => {
        const errMsg = `failed to create students`;
        console.error(`${errMsg}: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };

  public getStudentById: IHandlerStudent["getStudentById"] = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: `id ${id} is not a number` });
    }

    return this.repo
      .getStudentById(id)
      .then((student) => {
        if (!student) {
          return res.status(404).json({ error: `student ${student} not dound` });
        }

        return res.status(200).json(student).end();
      })
      .catch((err) => {
        const errMsg = `failed to create student: ${id}`;
        console.error(`${errMsg}: ${err}`);

        if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
          return res.status(400).json({ error: errMsg });
        }

        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };

  public deleteStudentById: IHandlerStudent["deleteStudentById"] = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: `id ${id} is not a number` });
    }

    return await this.repo
      .deleteStudentById(id)
      .then((student) => res.status(200).json({ message: `student ${id} ${student.fullname} deleted` }))
      .catch((err) => {
        const errMsg = `failed to delete student: ${id}`;
        console.error(`${errMsg}: ${err}`);

        if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
          return res.status(400).json({ error: errMsg });
        }

        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };

  public setClubs: IHandlerStudent["setClubs"] = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ error: "misiing id in params" }).end();
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: `id ${id} is not a number` });
    }

    const { clubsIds } = req.body;
    if (!clubsIds) {
      return res.status(400).json({ error: "missing clubsIds in body" }).end();
    }

    return await this.repo
      .setClubs(id, clubsIds)
      .then((student) => res.status(200).json(student).end())
      .catch((err) => {
        const errMsg = `failed to set clubs for student: ${id}`;
        console.error(`${errMsg}: ${err}`);

        if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
          return res.status(400).json({ error: errMsg });
        }

        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };
}
