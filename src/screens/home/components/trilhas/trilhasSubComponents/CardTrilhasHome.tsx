import styles from "./CardTrilhasHome.module.css";
import IconPadlock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../../services/api";

type TrailType = {
  trail: { name: string; id: string; description: string };
  lessonUser: TypeLessonUser;
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

const CardTrilhasHome = ({ trail, lessonUser }: TrailType) => {
  const navigate = useNavigate();


  useEffect(() => {

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
    if (trail === "produto" && atLeastOneCourseCompleted("engenharia")) {
      return true;
    }
    if (trail === "design" && atLeastOneCourseCompleted("produto")) {
      return true;
    }
    if (trail === "engenharia" && atLeastOneCourseCompleted("design")) {
      return true;
    }
  };

  const atLeastOneCourseCompleted = (trail: string) => {
    return lessonUser?.maxLessons?.find(
      (course: any) =>
        course.completed && course.trail.name.toLowerCase() === trail
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

    if (trail.name.toLowerCase() === mainUser.toLowerCase()) {
      return true;
    }
    if (trail.name.toLowerCase() === "academy") {
      return true;
    }
    if (trail.name.toLowerCase() === "design") {
      return unlockTrilha("design");
    }
    if (trail.name.toLowerCase() === "engenharia") {
      return unlockTrilha("engenharia");
    }
    if (trail.name.toLowerCase() === "produto") {
      return unlockTrilha("produto");
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
            {lessonUser && (
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
