import { useEffect, useState } from "react";

import Dropdown from "../../../../components/Dropdown/Dropdown";
import EmptyModal from "../../../../components/EmptyModal/EmptyModal";
import styles from "./CardProgress.module.css";
import CardInternProgress from "./components/CardInternProgress";
import CardCourseProgress from "./components/CardCourseProgress";
import IconCourse from "@mui/icons-material/TopicOutlined";
import IconAvatar from "@mui/icons-material/SupervisorAccountOutlined";
import IconClose from "@mui/icons-material/Close";
import { api } from "../../../../services/backend/Api";
import IconInfo from "@mui/icons-material/InfoOutlined";

import {
  UserProgressResponse,
  CourseProgressResponse,
} from "../../../types/CourseTypes";

type TypeCardProgress = {
  onClose: (value: boolean) => void;
  trailId: string;
};

const CardProgress = ({ onClose, trailId }: TypeCardProgress) => {
  const [usersProgress, setUsersProgress] = useState<UserProgressResponse[]>(
    []
  );
  const textIntern = "Todos estagiários";
  const textCourse = "Todos cursos";
  const [modulesQnt, setModulesQnt] = useState();
  const [courses, setCourses] = useState<CourseProgressResponse[]>([]);
  const [courseName, setCourseName] = useState(textCourse);
  const [intern, setIntern] = useState(textIntern);

  useEffect(() => {
    func();
  }, []);
  useEffect(() => {}, [usersProgress]);

  const func = async () => {
    const responseCourses = await api.get(`/progress/${trailId}`);
    setUsersProgress(responseCourses.data.usersProgress);
    setModulesQnt(responseCourses.data.modulesQnt);
    setCourses(responseCourses.data.courses);
  };

  const filteredProgress = () => {
    let progress = usersProgress;
    if (intern !== textIntern)
      progress = progress.filter((user) => user.userName === intern);

    return progress;
  };
  const getUserProgress = () => {
    return usersProgress.filter((user) => user.userName === intern)[0];
  };

  const getInternsList = () => {
    const list = usersProgress.map((user) => user.userName);
    list.sort().unshift(textIntern);
    return list;
  };

  const getCoursesList = () => {
    const list = courses.map((course) => course.name);
    list.sort().unshift(textCourse);
    return list;
  };

  const getModulesQnt = () => {
    if (courseName === textCourse) return modulesQnt!;
    return getCourse()!.modules.length;
  };

  const getCourse = () => {
    if (courseName !== textCourse)
      return courses.filter(
        (courseComparing) => courseComparing.name === courseName
      )[0];
  };

  // const setDropdownCourse = (value: string) => {
  //   setCourseName(value);
  //   setIntern(textIntern);
  // };
  // const setDropdownIntern = (value: string) => {
  //   setIntern(value);
  //   setCourseName(textCourse);
  // };
  const getProfilePic = () => {
    return usersProgress.filter((user) => user.userName === intern)[0]
      .userImage;
  };

  if (courses.length === 0 || usersProgress.length === 0) {
    return (
      <EmptyModal>
        <div className={styles.progress_container}>
          <div className={styles.title}>
            Progresso
            <div className={styles.fields}>
              <div className={styles.dropdown_container}>
                <Dropdown
                  value={courseName}
                  setValue={setCourseName}
                  options={getCoursesList()}
                  id={"1"}
                  width={243}
                  leftIcon={<IconCourse />}
                />
                <span>Selecione um curso</span>
              </div>
              <div className={styles.dropdown_container}>
                <Dropdown
                  value={intern}
                  setValue={setIntern}
                  options={getInternsList()}
                  id={"2"}
                  width={243}
                  leftIcon={<IconAvatar />}
                />
                <span>Selecione um estagiário</span>
              </div>
              <IconClose onClick={() => onClose(false)} />
            </div>
          </div>{" "}
          <div className={styles.progress_empty}>
            <IconInfo sx={{ fontSize: 43, color: "#eab308" }} />
            <span>
              {courses.length === 0
                ? "Crie pelo menos um curso "
                : "É necessário ao menos um estagiário cadastrado "}{" "}
              para ver o progresso.
            </span>
          </div>
        </div>
      </EmptyModal>
    );
  }
  return (
    <EmptyModal>
      <div className={styles.progress_container}>
        <div className={styles.title}>
          Progresso
          <div className={styles.fields}>
            <div className={styles.dropdown_container}>
              <Dropdown
                value={courseName}
                setValue={setCourseName}
                options={getCoursesList()}
                id={"1"}
                width={243}
                leftIcon={<IconCourse />}
              />
              <span>Selecione um curso</span>
            </div>
            <div className={styles.dropdown_container}>
              <Dropdown
                value={intern}
                setValue={setIntern}
                options={getInternsList()}
                id={"2"}
                width={243}
                leftIcon={<IconAvatar />}
              />
              <span>Selecione um estagiário</span>
            </div>
            <IconClose onClick={() => onClose(false)} />
          </div>
        </div>
        <div className={styles.selected_options}>
          {intern !== textIntern && <img src={getProfilePic()} alt="" />}
          <span>{intern !== textIntern ? intern : courseName}</span>
        </div>
        <div className={styles.cards_container}>
          {intern === textIntern ? (
            filteredProgress()!.map((user, index) => (
              <CardInternProgress
                key={index}
                user={user}
                modulesQnt={getModulesQnt()}
                course={getCourse()}
              />
            ))
          ) : courseName == textCourse ? (
            courses.map((course, index) => (
              <CardCourseProgress
                key={course.id}
                course={course}
                user={getUserProgress()}
              />
            ))
          ) : (
            <CardCourseProgress
              course={getCourse()!}
              user={getUserProgress()}
            />
          )}
        </div>
      </div>
    </EmptyModal>
  );
};

export default CardProgress;
