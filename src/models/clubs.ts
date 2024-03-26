const includeStudentWithClassroom = () => {
  return {
    students: {
      include: {
        classroom: true,
      },
    },
  };
};

export default { includeStudentWithClassroom };
