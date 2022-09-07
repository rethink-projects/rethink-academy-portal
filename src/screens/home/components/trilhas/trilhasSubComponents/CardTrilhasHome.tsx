import styles from "./CardTrilhasHome.module.css";
import IconPadlock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type TrailType = {
  trail: { name: string; id: string; description: string };
};

type TypeLessonUser = {
  maxLessons: Array<TypeMaxLesson>;
  user: {
    id: string;
    email: string;
    surnmae: string;
    main: string;
    watched: string[];
    role: string;
  };
};

type TypeMaxLesson = {
  lessonsLength: number;
  userLessonsLength: number;
  completed: boolean;
  name: string;
  id: string;
  trail: {
    id: string;
    name: string;
    description: string;
  };
};

const CardTrilhasHome = ({ trail }: TrailType) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lessonUser, setLessonUser] = useState<TypeLessonUser>();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/watched/" + user.email)
      .then((response) => {
        if (response.data) {
          setLessonUser(response.data);
        }
      });
  }, []);

  const getCoursesFromTrail = (trail: string) => {
    const allCourses = lessonUser?.maxLessons?.filter(
      (course: any) => course.trail.id === trail
    ).length;

    return allCourses;
  };

  const getCompletedUserCourses = (trail: string) => {
    const completedCourses = lessonUser?.maxLessons?.filter(
      (course: any) => course.trail.id === trail && course.completed
    ).length;

    return completedCourses;
  };

  const unlockTrilha = (trail: string) => {
    if (trail === "Produto" && atLeastOneCourseCompleted("Engenharia")) {
      return true;
    }
    if (trail === "Design" && atLeastOneCourseCompleted("Produto")) {
      return true;
    }
    if (trail === "Engenharia" && atLeastOneCourseCompleted("Design")) {
      return true;
    }
  };

  const atLeastOneCourseCompleted = (trail: string) => {
    return lessonUser?.maxLessons?.find(
      (course: any) => course.completed && course.trail.name === trail
    );
  };

  const checkWhichTrilhaUnlock = () => {
    let mainUser;
    if (lessonUser?.user.main === "ENGINEERING") {
      mainUser = "Engenharia";
    } else if (lessonUser?.user.main === "DESIGN") {
      mainUser = "Design";
    } else {
      mainUser = "Produto";
    }

    if (trail.name === mainUser) {
      return true;
    }
    if (trail.name === "Academy") {
      return true;
    }
    if (trail.name === "Design") {
      return unlockTrilha("Design");
    }
    if (trail.name === "Engenharia") {
      return unlockTrilha("Engenharia");
    }
    if (trail.name === "Produto") {
      return unlockTrilha("Produto");
    }
  };

  const calculoPorcentagem = () => {
    const max = getCoursesFromTrail(trail.id);
    const completed = getCompletedUserCourses(trail.id);
    if (max === 0) {
      return 0;
    }

    return Math.floor((completed! / max!) * 100);
  };

  const atLeastOneCourse = () => {
    if (getCoursesFromTrail(trail.id) === getCompletedUserCourses(trail.id)) {
      const coursesVerify = lessonUser?.maxLessons?.find(
        (course: any) => course.trail.id === trail.id
      );
      if (!coursesVerify) {
        return false;
      }
      return true;
    }
  };

  const handleClickTrail = () => {
    navigate(`trilhas/${trail.id}`);
  };

  const containerClass = atLeastOneCourse()
    ? styles.container_completed
    : styles.container;
  return (
    <div
      style={checkWhichTrilhaUnlock() ? {} : { backgroundColor: "#f9f9f9" }}
      className={containerClass}
      onClick={handleClickTrail}
    >
      <span className={styles.name_trilha}>{trail.name}</span>
      <div className={styles.divisoria}></div>
      <div className={styles.state}>
        {checkWhichTrilhaUnlock() ? (
          <div className={styles.free}>
            {getCoursesFromTrail(trail.id) && (
              <>
                <span>{calculoPorcentagem()}%</span>
                <ProgressBar
                  totalValue={getCoursesFromTrail(trail.id)!}
                  relativeValue={getCompletedUserCourses(trail.id)!}
                  size="small"
                  width={110}
                />
              </>
            )}
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
