import express from "express";
import type { RequestHandler } from "express";

import { IClassroomDto, IClassroomsDto, ICreateClassroomDto } from "../dto/classroom";
import { Empty, ErrorReason } from "../dto/utils.type";

import { handlerClassroom } from "../bootstrap";

export interface IHandlerClassroom {
  createClassroom: RequestHandler<Empty, IClassroomDto | ErrorReason, ICreateClassroomDto>;
  getClassrooms: RequestHandler<Empty, IClassroomsDto[] | ErrorReason>;
}

const routerClassroom = express.Router();

routerClassroom.route("/").get(handlerClassroom.getClassrooms.bind(handlerClassroom));
routerClassroom.route("/").post(handlerClassroom.createClassroom.bind(handlerClassroom));

export default routerClassroom;
