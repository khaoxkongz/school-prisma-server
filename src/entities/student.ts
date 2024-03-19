export interface ICreateStudent {
  fullname: string;
  classId: number;
  clubsIds?: number[];
}

export interface IStudent {
  id: number;
  fullname: string;
  classroomId: number;
}
