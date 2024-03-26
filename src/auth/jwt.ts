import type { RequestHandler } from "express";

import jsonwebtoken from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

import { AuthPayload, AuthStatus } from "../dto/auth";
import { JWT_SECRET } from "../utils/config";

import { getAuthHeader } from "../utils/helper";

const generateJWT = (data: AuthPayload): string => {
  const { userId, username } = data;
  return jsonwebtoken.sign({ userId, username }, JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "12h",
    issuer: "academic-api",
    subject: "teacher-credential",
  });
};

export class JwtMiddleware {
  constructor() {}

  public auth: RequestHandler<undefined, unknown, undefined, undefined, AuthStatus> = (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        return res.status(401).json({ message: "this request must have authorization header" }).end();
      }

      const token = getAuthHeader(authHeader);

      const { userId, username } = jsonwebtoken.verify(token, JWT_SECRET) as JwtPayload;

      if (typeof userId !== "string") {
        return res.status(500).json({ message: `Unexpected id value: ${userId}` });
      }

      if (typeof username !== "string") {
        return res.status(500).json({ message: `Unexpected username value: ${username}` });
      }

      res.locals = { payload: { userId, username } };

      return next();
    } catch (error) {
      return res.status(403).send(`Forbidden: ${error}`);
    }
  };
}

export default { generateJWT };
