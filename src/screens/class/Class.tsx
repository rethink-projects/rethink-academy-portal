import { useLocation } from "react-router-dom";
// import Acordeon from "../../components/Acordeon/Acordeon";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Class.module.css";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import Acordeon from "../../components/Acordeon/Acordeon";

interface LessonResponse {
  completed: boolean;
  description: string;
  embedUrl: string;
  id: string;
  name: string;
  order: number;
}

interface ModuleResponse {
  moduleId: string;
  moduleName: string;
  moduleCompleted: boolean;
  moduleBlocked: boolean;
  lessons: LessonResponse[];
}

interface Profile {
  id: string;
  bio: string;
  avatar: string;
  social: JSON;
  userId: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
  surname: string;
  main: string;
  watched: string[];
  role: "STUDENT" | "EMBASSADOR" | "RETHINKER";
  profile?: Profile;
  // course: CourseResponse[];
}

interface Trail {
  id: string;
  name: string;
  description: string;
  weight: number;
  course?: CourseResponse[];
}

interface Module {
  id: string;
  name: string;
  courseId: string;
  lessons: Lesson[];
  order: number;
}

interface Lesson {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
  module: {
    order: number;
  };
}

export interface CourseResponse {
  id: string;
  name: string;
  description: string;
  level: "LOW" | "MEDIUM" | "HIGH";
  workload: number;
  learning: string;
  skills: string;
  trailId: string;
  modules: Module[];
  // teacherId: string;
  teacherName: string;
  teacherDescription: string;
  imageTeacher: string;
  type: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

///////////////////////////////////////////////////

const Class = () => {
  const { user } = useAuth();

  const location = useLocation();
  let id = location.pathname.split("/");
  const idCourse = id[4];
  const idClass = id[6];

  const [indexDiv, setIndexDiv] = useState(1);
  const [urlLesson, setUrlLesson] = useState("");

  const [modules, setModules] = useState<ModuleResponse[]>([]);
  const [lesson, setLesson] = useState<Lesson>();
  const [course, setCourse] = useState("");
  const [moduleOrder, setModuleOrder] = useState(0);
  const [lessonOrder, setLessonOrder] = useState(0);
  const [lessonsWatched, setLessonsWatched] = useState<string[]>([]);

  const playVideo = async () => {
    setIndexDiv(-1);
    setUrlLesson(urlLesson + "?autoplay=1");

    if (!lessonsWatched.includes(idClass)) {
      lessonsWatched.push(idClass);
      const response = await api.put(`/user/${user.email}`, {
        watched: lessonsWatched,
      });

      const responseModule = await api.get(
        `/lesson/watched/${user.email}/${idClass}?courseId=${idCourse}`
      );
      setModules(responseModule.data.modules);
    }
  };

  useEffect(() => {
    lesson?.embedUrl && setUrlLesson(lesson?.embedUrl);
  }, [lesson]);

  useEffect(() => {
    if (user?.email) {
      const func = async () => {
        const responseUser = await api.get(`/user/${user.email}`);
        setLessonsWatched(responseUser.data.user.watched);

        const responseClass = await api.get(`/lesson/${idClass}`);
        setLesson(responseClass.data.lesson);

        const responseModule = await api.get(
          `/lesson/watched/${user.email}/${idClass}?courseId=${idCourse}`
        );
        setModules(responseModule.data.modules);
        setModuleOrder(responseModule.data.moduleOrder);
        setLessonOrder(responseModule.data.lessonOrder);
        setCourse(responseModule.data.nameCourse);
      };
      func();
    }
  }, [user]);

  const getBreadcrumbs = () => {
    const url = location.pathname;
    let path = url.split("/curso");
    const linkHome = { title: "Home", link: "/" };
    const linkTrilhas = { title: "Trilhas", link: "/trilhas" };
    const linkCourses = { title: "Cursos", link: path[0] };
    const linkCourse = { title: "Curso 1", link: url };
    return [linkHome, linkTrilhas, linkCourses, linkCourse];
  };

  return (
    <div className={styles.class_container}>
      <div className={styles.left_container}>
        <div className={styles.class_class}>
          <Breadcrumb breadcrumbItems={getBreadcrumbs()} />
          <div className={styles.class_title}>
            <IconVideoCam />
            <h1>
              Aula {moduleOrder}.{lessonOrder} - {lesson?.name}
            </h1>
          </div>
          <div className={styles.class_video}>
            <div
              onClick={() => playVideo()}
              style={{ zIndex: indexDiv }}
              className={styles.container_firstClick}
            ></div>
            <iframe
              id="iframe_id"
              className={styles.video_teste}
              src={urlLesson}
              title="Loom 01"
              frameBorder="0"
              width={1040}
              height={585}
            ></iframe>
          </div>
          <div className={styles.class_description}>
            <h1>Sobre a aula:</h1>
            <p>{lesson?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.class_class_list}>
        <h1>{course.toUpperCase()}</h1>
        {modules &&
          modules.map((module, index) => {
            let lessonsArray: any = [];
            let indexMod = index + 1;

            module.lessons.map((lesson, index) => {
              lessonsArray.push({
                id: lesson.id,
                name: ` Aula ${indexMod}.${index + 1} - ${lesson.name}`,
                url: lesson.embedUrl,
                completed: lesson.completed,
                description: lesson.description,
                order: lesson.order,
                duration: "(mm:ss)",
                type: "video",
              });
              return <div key={index}></div>;
            });

            return (
              <Acordeon
                key={index}
                module={{
                  id: index + 1,
                  name: module.moduleName,
                  blocked: module.moduleBlocked,
                  completed: module.moduleCompleted,
                  classes: lessonsArray,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Class;
