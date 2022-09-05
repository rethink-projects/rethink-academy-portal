import { useEffect, useState } from "react";

import Dropdown from "../../../../components/Dropdown/Dropdown";
import EmptyModal from "../../../../components/EmptyModal/EmptyModal";
import styles from "./CardProgress.module.css";
import IndividualCard from "./components/IndividualCard";
import IconCourse from "@mui/icons-material/TopicOutlined";
import IconAvatar from "@mui/icons-material/SupervisorAccountOutlined";
import IconClose from "@mui/icons-material/Close";
import { api } from "../../../../services/api";
import {
  UserProgressResponse,
  CourseProgressResponse,
} from "../../../types/CourseTypes";

type TypeCardProgress = {
  onClose: (value: boolean) => void;
  trailId: string;
};

// http://localhost:4000/api/progress/idDoAcademy

const CardProgress = ({ onClose, trailId }: TypeCardProgress) => {
  const [usersProgress, setUsersProgress] = useState<UserProgressResponse[]>(
    []
  );
  const [modulesQnt, setModulesQnt] = useState();
  const [courses, setCourses] = useState<CourseProgressResponse[]>([]);
  const [courseName, setCourseName] = useState("Todos cursos");
  const [intern, setIntern] = useState("Todos estagiários");

  useEffect(() => {
    func();
  }, []);
  useEffect(() => {}, [usersProgress]);

  const func = async () => {
    const responseCourses = await api.get(`/progress/idDoAcademy`);
    // const responseCourses = await api.get(`/progress/${trailId}`);
    setUsersProgress(responseCourses.data.usersProgress);
    setModulesQnt(responseCourses.data.modulesQnt);
    setCourses(responseCourses.data.courses);
  };

  const filteredProgress = () => {
    let progress = usersProgress;
    if (intern !== "Todos estagiários")
      progress = progress.filter((user) => user.userName === intern);

    return progress;
  };

  const getInternsList = () => {
    const list = usersProgress.map((user) => user.userName);
    list.sort().unshift("Todos estagiários");
    return list;
  };

  const getCoursesList = () => {
    const list = courses.map((course) => course.name);
    return list.sort();
  };

  const getModulesQnt = () => {
    if (courseName === "Todos cursos") return modulesQnt!;
    return getCourse()!.modules.length;
  };

  const getCourse = () => {
    if (courseName !== "Todos cursos")
      return courses.filter(
        (courseComparing) => courseComparing.name === courseName
      )[0];
  };

  const setDropdownCourse = (value: string) => {
    setCourseName(value);
    setIntern("Todos estagiários");
  };
  const setDropdownIntern = (value: string) => {
    setIntern(value);
    setCourseName("Todos cursos");
  };

  if (usersProgress.length === 0 || modulesQnt === 0)
    return <div>loading...</div>;

  return (
    <EmptyModal onClose={() => ""}>
      <div className={styles.progress_container}>
        <div className={styles.title}>
          Progresso
          <div className={styles.fields}>
            <div className={styles.dropdown_container}>
              <Dropdown
                value={courseName}
                setValue={setDropdownCourse}
                options={getCoursesList()}
                id={"1"}
                width={360}
                leftIcon={<IconCourse />}
              />
              <span>Selecione um curso</span>
            </div>
            <div className={styles.dropdown_container}>
              <Dropdown
                value={intern}
                setValue={setDropdownIntern}
                options={getInternsList()}
                id={"2"}
                width={243}
                // initialText={"Selecionar estagiário"}
                leftIcon={<IconAvatar />}
              />
              <span>Selecione um estagiário</span>
            </div>
            <IconClose onClick={() => onClose(false)} />
          </div>
        </div>

        <span className={styles.course_name}>{courseName}</span>
        <div className={styles.cards_container}>
          {filteredProgress()!.map((user, index) => (
            <IndividualCard
              key={index}
              user={user}
              modulesQnt={getModulesQnt()}
              course={getCourse()}
            />
          ))}
        </div>
      </div>
    </EmptyModal>
  );
};

export default CardProgress;
