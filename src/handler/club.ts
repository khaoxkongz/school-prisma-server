import { IHandlerClubs } from "../routes/club";
import { IRepositoryClub } from "../interfaces/club";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class HandlerClub implements IHandlerClubs {
  private repo: IRepositoryClub;

  constructor(repo: IRepositoryClub) {
    this.repo = repo;
  }

  public createClub: IHandlerClubs["createClub"] = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "missing name in body" }).end();
    }

    if (name !== "string" || name.length < 0) {
      return res.status(400).json({ error: "name must be empty" }).end();
    }

    return this.repo
      .createClub(name)
      .then((club) => res.status(201).json(club).end())
      .catch((err) => {
        const errMsg = `failed to create club ${name}`;
        console.error(`${errMsg}: ${err}`);

        if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
          return res.status(400).json({ error: errMsg });
        }

        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };

  public getClubs: IHandlerClubs["getClubs"] = async (_req, res) => {
    return this.repo
      .getClubs()
      .then((clubs) => res.status(200).json(clubs).end())
      .catch((err) => {
        const errMsg = `failed to retrieve clubs`;
        console.error(`${errMsg}: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };
}
