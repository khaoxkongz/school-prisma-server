import express from "express";

import routerClassroom from "./classroom";
import routerStudent from "./student";
import routerClub from "./club";

import routerTeacher from "./teacher";
import routerCourse from "./course";

const router = express.Router();

router.use("/classrooms", routerClassroom);
router.use("students", routerStudent);
router.use("clubs", routerClub);

router.use("/teacher", routerTeacher);
router.use("course", routerCourse);

export default router;
