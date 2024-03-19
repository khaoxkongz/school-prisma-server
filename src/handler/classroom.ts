import { Request, Response } from "express";
import { IRepositoryClassroom } from "../repositories";

export class HandlerClassroom {
  private repo: IRepositoryClassroom;

  constructor(repo: IRepositoryClassroom) {
    this.repo = repo;
  }

  async createClassroom(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: `missing name in body` }).end();
    }

    return this.repo
      .createClassroom(name)
      .then((classroom) => res.status(201).json(classroom).end())
      .catch((err) => {
        const errMsg = `failed to create classroom ${name}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async getClassrooms(req: Request, res: Response): Promise<Response> {
    return this.repo
      .getClassrooms()
      .then((classroom) => res.status(200).json(classroom).end())
      .catch((err) => {
        const errMsg = `failed to get classrooms`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ err: errMsg }).end();
      });
  }
}
