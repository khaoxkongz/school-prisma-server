import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { ICreateStudent } from "../entities";

const connectClassroom = (classId: number): Prisma.ClassroomCreateNestedOneWithoutStudentsInput => {
  return { connect: { id: classId } };
};

const connectSomeClubs = (clubsIds?: number[]): Prisma.ClubCreateNestedManyWithoutStudentsInput => {
  return {
    // connect: [{ id: 1}, {id: 2}]
    connect: clubsIds?.map((clubsId) => {
      return { id: clubsId };
    }),
  };
};

const setClubs = (clubsIds: number[]): Prisma.ClubWhereUniqueInput | Prisma.ClubWhereUniqueInput[] => {
  return clubsIds.map((clubsId) => {
    return { id: clubsId };
  });
};

const tranformDataToSetAndConnectClubs = (clubsIds: number[]): Prisma.StudentUpdateInput => {
  return {
    clubs: {
      // set: [{id: 1}, {id: 2}, {id: 3}]
      set: setClubs(clubsIds),
    },
  };
};

const tranformDataDtoToCreateDataModel = (data: ICreateStudent): Prisma.StudentCreateInput => {
  return {
    fullname: data.fullname,
    // Connect classroom
    classroom: connectClassroom(data.classId),
    // Connect clubs
    clubs: connectSomeClubs(data.clubsIds),
  };
};

const includeClassroomAndClubs = (): Prisma.StudentInclude<DefaultArgs> => {
  return { classroom: true, clubs: true };
};

export default { tranformDataDtoToCreateDataModel, includeClassroomAndClubs, tranformDataToSetAndConnectClubs };
