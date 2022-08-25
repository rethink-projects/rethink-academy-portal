import styles from "./CardTrilhasHome.module.css";
import IconPadlock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";

type TrailType = {
  trilha: { name: string; id: number; description: string };
};

const CardTrilhasHome = ({ trilha }: TrailType) => {
  const user = {
    id: 1,
    name: "Fernando",
    main: { title: "engenharia", id: 3 },
    courses: [
      {
        trail: 3,
        course_id: 1,
        completed: true,
      },
      {
        trail: 3,
        course_id: 2,
        completed: true,
      },
    ],
  };

  const courses = [
    {
      id: 1,
      name: "Nothink",
      trilha: 3,
      lastClass: 2,
      completed: true,
    },
    {
      id: 2,
      name: "NodeJS",
      trilha: 3,
      lastClass: 3,
      completed: true,
    },
    {
      id: 3,
      name: "Soft Skills",
      trilha: 1,
      lastClass: 4,
      completed: true,
    },
    {
      id: 4,
      name: "Design",
      trilha: 2,
      lastClass: 10,
      completed: true,
    },
    {
      id: 4,
      name: "Produto",
      trilha: 4,
      lastClass: 10,
      completed: true,
    },
  ];

  const getCoursesFromTrail = (trilha: number) => {
    const allCourses = courses.filter(
      (course) => course.trilha === trilha
    ).length;
    return allCourses;
  };

  const getCompletedUserCourses = (trilha: number) => {
    const completedCourses = user.courses.filter(
      (course: any) => course.trail === trilha && course.completed
    ).length;

    return completedCourses;
  };

  const unlockTrilha = (trail: string) => {
    if (trail === "produto" && atLeastOneCourseCompleted(3)) {
      return true;
    }
    if (trail === "design" && atLeastOneCourseCompleted(4)) {
      return true;
    }
    if (trail === "design" && atLeastOneCourseCompleted(2)) {
      return true;
    }
  };

  const atLeastOneCourseCompleted = (trailId: number) => {
    return user.courses.find(
      (course: any) => course.completed && course.trilha === trailId
    );
  };

  const checkWhichTrilhaUnlock = () => {
    if (trilha.name === user.main.title) {
      return true;
    }
    if (trilha.name === "academy") {
      return true;
    }
    if (trilha.name === "design") {
      return unlockTrilha("design");
    }
    if (trilha.name === "engenharia") {
      return unlockTrilha("engenharia");
    }
    if (trilha.name === "produto") {
      return unlockTrilha("produto");
    }
  };

  const calculoPorcentagem = () => {
    const max = getCoursesFromTrail(trilha.id);
    const completed = getCompletedUserCourses(trilha.id);
    if (max === 0) {
      return 0;
    }

    return Math.floor((completed / max) * 100);
  };

  const atLeastOneCourse = () => {
    if (getCoursesFromTrail(trilha.id) === getCompletedUserCourses(trilha.id)) {
      const coursesVerify = courses.find(
        (course: any) => course.trilha === trilha.id
      );
      if (!coursesVerify) {
        return false;
      }
      return true;
    }
  };

  const containerClass = atLeastOneCourse()
    ? styles.container_completed
    : styles.container;
  return (
    <div className={containerClass}>
      <span className={styles.name_trilha}>{trilha.name}</span>
      <div className={styles.divisoria}></div>
      <div className={styles.state}>
        {checkWhichTrilhaUnlock() ? (
          <div className={styles.free}>
            <span>{calculoPorcentagem()}%</span>
            <ProgressBar
              totalValue={getCoursesFromTrail(trilha.id)}
              relativeValue={getCompletedUserCourses(trilha.id)}
              size="small"
              width={110}
            />
          </div>
        ) : (
          <div className={styles.blocked}>
            <div className={styles.padlock_border}>
              <IconPadlock />
            </div>
            <span>Bloqueada!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardTrilhasHome;
