import { IHandlerClassroom } from "../routes/classroom";
import { IRepositoryClassroom } from "../interfaces/classroom";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class HandlerClassroom implements IHandlerClassroom {
  private repo: IRepositoryClassroom;

  constructor(repo: IRepositoryClassroom) {
    this.repo = repo;
  }

  public createClassroom: IHandlerClassroom["createClassroom"] = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: `missing name in body` }).end();
    }

    if (name !== "string" || name.length < 0) {
      return res.status(400).json({ error: "name must be empty" }).end();
    }

    return this.repo
      .createClassroom(name)
      .then((classroom) => res.status(201).json(classroom).end())
      .catch((err) => {
        const errMsg = `failed to create classroom ${name}`;
        console.error(`${errMsg}: ${err}`);

        if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
          return res.status(400).json({ error: errMsg });
        }

        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };

  public getClassrooms: IHandlerClassroom["getClassrooms"] = async (req, res) => {
    return this.repo
      .getClassrooms()
      .then((classroom) => res.status(200).json(classroom).end())
      .catch((err) => {
        const errMsg = `failed to get classrooms`;
        console.error(`${errMsg}: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" }).end();
      });
  };
}
