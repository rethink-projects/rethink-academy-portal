import styles from "./CardTrilhas.module.css";
import PadLock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import EditIcon from "@mui/icons-material/BorderColorOutlined";
import { useAuth } from "../../../../context/AuthContext";

type TypeTrail = {
  name: string;
  id: string;
  description: string;
  main: string;
};

type TypeCardTrilhas = {
  userRole?: "STUDENT" | "TEACHER";
  trail: TypeTrail;
  image?: string;
  onClick: (e: any) => void;
  previous: string;
  setModal: () => void;
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

const CardTrilhas = ({
  userRole = "STUDENT",
  onClick,
  trail,
  previous,
  setModal,
  image,
  lessonUser,
}: TypeCardTrilhas) => {
  const getCoursesFromTrail = (trail: string) => {
    const allCourses = lessonUser.maxLessons.filter(
      (course: any) => course.trail.id === trail
    ).length;

    return allCourses;
  };
  let mainUser = "";
  const { user } = useAuth();
  if (user) mainUser = user.main;

  if (mainUser === "") return <div>Loading...</div>;

  const getCompletedUserCourses = (trail: string) => {
    const completedCourses = lessonUser.maxLessons.filter(
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
    if (trail.main.toLowerCase() === mainUser.toLowerCase()) {
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
    if (completed === 0) return 0;
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

  if (!checkWhichTrilhaUnlock() && userRole === "STUDENT") {
    onClick = () => {};
  }

  const card_progressBar = atLeastOneCourse()
    ? styles.card_progressBar_complete
    : styles.card_progressBar_incomplete;
  const completedCourseClass_container =
    atLeastOneCourse() && userRole === "STUDENT"
      ? styles.container_completed
      : styles.container;
  const completedCourseClass_effect_img = atLeastOneCourse()
    ? styles.effect_image_completed
    : styles.effect_image_incomplete;
  const completedCourseClass_effect_card_hover =
    atLeastOneCourse() && userRole === "STUDENT"
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
          {userRole === "STUDENT" && (
            <div className={completedCourseClass_effect_img}></div>
          )}
        </div>
        <div className={styles.card_content}>
          <h1 className={styles.card_content_title}>{trail.name}</h1>
          <p className={styles.card_content_description}>{trail.description}</p>
          {userRole === "STUDENT"
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
      {!checkWhichTrilhaUnlock() && userRole === "STUDENT" ? (
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
