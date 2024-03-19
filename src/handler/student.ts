import { Request, Response } from "express";
import { IRepositoryStudent } from "../repositories";

export class HandlerStudent {
  private repo: IRepositoryStudent;

  constructor(repo: IRepositoryStudent) {
    this.repo = repo;
  }

  async createStudent(req: Request, res: Response): Promise<Response> {
    const { fullname, classId, clubsIds } = req.body;
    if (!fullname || !classId) {
      return res.status(400).json({ error: "missing fullname or classId in body" }).end();
    }

    return this.repo
      .createStudent({ fullname, classId, clubsIds })
      .then((student) => res.status(201).json(student).end())
      .catch((err) => {
        const errMsg = `failed to create student ${fullname}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async getStudents(req: Request, res: Response): Promise<Response> {
    return this.repo
      .getStudents()
      .then((students) => res.status(200).json(students).end())
      .catch((err) => {
        const errMsg = `failed to create students`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async getStudentById(req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: `id ${id} is not a number` })
        .end();
    }

    return this.repo
      .getStudentById(id)
      .then((student) => {
        if (!student) {
          return res
            .status(404)
            .json({ error: `student ${student} not dound` })
            .end();
        }

        return res.status(200).json(student).end();
      })
      .catch((err) => {
        const errMsg = `failed to create student: ${id}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async deleteStudentById(req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: `id ${id} is not a number` })
        .end();
    }

    return await this.repo
      .deleteStudentById(id)
      .then((student) =>
        res
          .status(200)
          .json({ status: `student ${id} ${student.fullname} deleted` })
          .end()
      )
      .catch((err) => {
        const errMsg = `failed to delete student: ${id}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async setClubs(req: Request, res: Response): Promise<Response> {
    if (!req.params.id) {
      return res.status(400).json({ error: "misiing id in params" }).end();
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: `id ${id} is not a number` })
        .end();
    }

    const { clubsIds } = req.body;
    if (!clubsIds) {
      return res.status(400).json({ error: "missing clubsIds in body " }).end();
    }

    return await this.repo
      .setClubs(id, clubsIds)
      .then((student) => res.status(200).json(student).end())
      .catch((err) => {
        const errMsg = `failed to set clubs for student: ${id}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }
}
