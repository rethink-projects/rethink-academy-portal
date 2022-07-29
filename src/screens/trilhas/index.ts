type CoursesUser = {
  course_id: number;
  lastWatched_class_id: string;
  watched: Array<string>;
  completed: boolean;
};
type TrilhasUser = {
  trilha_id: number;
  courses: Array<CoursesUser>;
};
type User = {
  name: string;
  main: string;
  trilhas: Array<TrilhasUser>;
};
type Course = {
  id: number;
  name: string;
  trilha: number;
  lastCourse: number;
  completed: boolean;
  description: string;
};
type Trilhas = { name: string; id: number; description: string };

const getProgressBarInputs = (
  i: number,
  user: User,
  courses: Array<Course>
) => {
  let totalVideo = 0;
  let watched = 0;
  if (user.trilhas.filter((trilha) => trilha.trilha_id === i)[0] != null) {
    watched = user.trilhas
      .filter((trilha) => trilha.trilha_id === i)[0]
      .courses.filter((course) => course.completed == true).length;
  }
  courses.forEach((course) => {
    if (course.trilha === i) {
      totalVideo++;
    }
  });
  return {
    totalVideo,
    watched,
  };
};

const getTrailTitle = (i: number, trilhas: Array<Trilhas>) => {
  const title = trilhas.filter((trilha) => trilha.id === i)[0].name;

  return title[0].toUpperCase() + title.substring(1).toLowerCase();
};

const getTrailDescription = (i: number, trilhas: Array<Trilhas>) => {
  const description = trilhas.filter((x) => x.id === i)[0].description;
  return description;
};

const getPreviousTrailId = (i: number, trilhas: Array<Trilhas>) => {
  if (i > 2) {
    return i - 1;
  } else {
    return trilhas.length;
  }
};

const isBlocked = (
  i: number,
  trilhas: Array<Trilhas>,
  user: User,
  courses: Array<Course>
) => {
  if (
    trilhas[1].id === i ||
    i === 1 ||
    getProgressBarInputs(getPreviousTrailId(i, trilhas), user, courses)
      .watched > 0
  ) {
    return false;
  } else {
    return true;
  }
};

const reorderTrail = (trilhas: Array<Trilhas>, user: User) => {
  const main_id = trilhas.filter((trilha) => trilha.name === user.main)[0].id;
  const auxArray = [];
  auxArray.push(trilhas[0]);
  for (let i = main_id - 1; i < trilhas.length; i++) {
    auxArray.push(trilhas[i]);
  }
  for (let i = 1; i < main_id - 1; i++) {
    auxArray.push(trilhas[i]);
  }
  trilhas = auxArray;
};

export {
  getProgressBarInputs,
  getTrailTitle,
  getTrailDescription,
  getPreviousTrailId,
  isBlocked,
  reorderTrail,
};
