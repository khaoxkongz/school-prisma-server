import { Request, Response } from "express";

import { IRepositoryClub } from "../repositories";

export class HandlerClub {
  private repo: IRepositoryClub;

  constructor(repo: IRepositoryClub) {
    this.repo = repo;
  }

  async createClub(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "missing name in body" }).end();
    }

    return this.repo
      .createClub(name)
      .then((club) => res.status(201).json(club).end())
      .catch((err) => {
        const errMsg = `failed to create club ${name}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async getClubs(_: Request, res: Response): Promise<Response> {
    return this.repo
      .getClubs()
      .then((clubs) => res.status(200).json(clubs).end())
      .catch((err) => {
        const errMsg = `failed to create club ${name}`;
        console.error(`${errMsg}: ${err}`);

        return res.status(500).json({ error: errMsg }).end();
      });
  }
}
