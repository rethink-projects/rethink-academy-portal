import styles from "./CardTrilhas.module.css";
import PadLock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import EditIcon from "@mui/icons-material/BorderColorOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

type TypeTrail = { name: string; id: string; description: string };

type TypeCardTrilhas = {
  user?: "student" | "teacher";
  trail: TypeTrail;
  image?: string;
  onClick: (e: any) => void;
  previous: string;
  setModal: () => void;
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

const CardTrilhas = ({
  user = "student",
  onClick,
  trail,
  previous,
  setModal,
  image,
}: TypeCardTrilhas) => {
  const [lessonUser, setLessonUser] = useState<TypeLessonUser>();
  const { user: userAuth } = useAuth();

  useEffect(() => {
    axios.get("/user/watched/" + userAuth.email).then((response) => {
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

  if (!checkWhichTrilhaUnlock() && user === "student") {
    onClick = () => {};
  }

  const card_progressBar = atLeastOneCourse()
    ? styles.card_progressBar_complete
    : styles.card_progressBar_incomplete;
  const completedCourseClass_container =
    atLeastOneCourse() && user === "student"
      ? styles.container_completed
      : styles.container;
  const completedCourseClass_effect_img = atLeastOneCourse()
    ? styles.effect_image_completed
    : styles.effect_image_incomplete;
  const completedCourseClass_effect_card_hover =
    atLeastOneCourse() && user === "student"
      ? styles.effect_card_completed
      : styles.effect_card_incomplete;
  const videoBlockedClass = !checkWhichTrilhaUnlock()
    ? styles.container_video_blocked
    : "";
  return (
    <div
      className={completedCourseClass_container}
      onClick={(e: any) => onClick(e)}
      id="container"
    >
      <div className={styles.container_inner}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={styles.card_image}
        >
          {user === "student" && (
            <div className={completedCourseClass_effect_img}></div>
          )}
        </div>
        <div className={styles.card_content}>
          <h1 className={styles.card_content_title}>{trail.name}</h1>
          <p className={styles.card_content_description}>{trail.description}</p>
          {user === "student"
            ? lessonUser && (
                <div className={styles.container_progressbar}>
                  <div className={card_progressBar}>
                    <span>{`${calculoPorcentagem()}%`}</span>
                    <ProgressBar
                      width={242}
                      relativeValue={getCompletedUserCourses(trail.id)!}
                      totalValue={
                        getCoursesFromTrail(trail.id)! > 0
                          ? getCoursesFromTrail(trail.id)!
                          : 1
                      }
                    />
                  </div>
                  <p className={styles.legend_progressBar}>
                    {`${getCompletedUserCourses(
                      trail.id
                    )} de ${getCoursesFromTrail(
                      trail.id
                    )} curso(s) concluído(s).`}
                  </p>
                </div>
              )
            : lessonUser && (
                <div className={styles.container_edit}>
                  <p className={styles.quantity_courses}>
                    {getCoursesFromTrail(trail.id)! > 1 ||
                    getCoursesFromTrail(trail.id) == 0
                      ? `${getCoursesFromTrail(trail.id)} Cursos`
                      : `${getCoursesFromTrail(trail.id)} Curso`}
                  </p>
                  <div id="edit" onClick={setModal} className={styles.edit}>
                    <ButtonWithIcon
                      width={100}
                      position="left"
                      text="Editar"
                      icon={<EditIcon />}
                      size="small"
                      type="primary"
                    />
                    <div
                      id="edit_action"
                      className={styles.overlap_button}
                    ></div>
                  </div>
                </div>
              )}
        </div>
      </div>
      {!checkWhichTrilhaUnlock() && user === "student" ? (
        <div className={videoBlockedClass}>
          <div className={styles.container_padlock}>
            <PadLock />
          </div>
          <div className={styles.content_video_blocked}>
            <h1>Trilha Bloqueada!</h1>
            <p>
              {`Assista pelo menos um curso da Trilha ${previous} para
              desbloquear.`}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.hover_card}>
          <div className={completedCourseClass_effect_card_hover}></div>
        </div>
      )}
    </div>
  );
};

export default CardTrilhas;
