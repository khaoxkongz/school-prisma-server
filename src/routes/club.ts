import express from "express";
import type { RequestHandler } from "express";

import { IClubWithStudentsDto, IClubsDto, ICreateClubDto } from "../dto/clubs";
import { Empty, ErrorReason } from "../dto/utils.type";

import { handlerClub } from "../bootstrap";

export interface IHandlerClubs {
  createClub: RequestHandler<Empty, IClubsDto | ErrorReason, ICreateClubDto>;
  getClubs: RequestHandler<Empty, IClubWithStudentsDto[] | ErrorReason>;
}

const routerClub = express.Router();

routerClub.route("/").post(handlerClub.createClub.bind(handlerClub));
routerClub.route("/").get(handlerClub.getClubs.bind(handlerClub));

export default routerClub;
