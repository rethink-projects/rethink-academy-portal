import { Link, useLocation, useNavigate } from "react-router-dom";
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
  // courseName: CourseResponse[];
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
  teacherName: string;
  teacherDescription: string;
  imageTeacher: string;
  courseStyle: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

///////////////////////////////////////////////////

const Class = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const location = useLocation();
  let id = location.pathname.split("/");
  const trailId = id[3];
  const courseId = id[5];
  const lessonId = id[7];
  // console.log(lessonId);

  const [indexDiv, setIndexDiv] = useState(1);
  const [urlLesson, setUrlLesson] = useState("");

  const [modules, setModules] = useState<ModuleResponse[]>([]);
  const [lesson, setLesson] = useState<Lesson>();
  const [courseName, setCourseName] = useState("");
  const [trailName, setTrailName] = useState("");
  const [moduleOrder, setModuleOrder] = useState(0);
  const [lessonOrder, setLessonOrder] = useState(0);
  const [lessonsWatched, setLessonsWatched] = useState<string[]>([]);

  const playVideo = async () => {
    setIndexDiv(-1);
    setUrlLesson(urlLesson + "?autoplay=1");
    // console.log("check: " + lessonId);

    if (!lessonsWatched.includes(lessonId)) {
      lessonsWatched.push(lessonId);
      const response = await api.put(`/user/${user.email}`, {
        watched: lessonsWatched,
      });

      const responseModule = await api.get(
        `/lesson/watched/${user.email}/${lessonId}?courseId=${courseId}`
      );

      setModules(responseModule.data.modules);
    }
  };

  useEffect(() => {
    lesson?.embedUrl && setUrlLesson(lesson?.embedUrl);
  }, [lesson]);

  const getInfoLesson = async () => {
    const responseClass = await api.get(`/lesson/${lessonId}`);
    setLesson(responseClass.data.lesson);

    const responseModule = await api.get(
      `/lesson/watched/${user.email}/${lessonId}?courseId=${courseId}`
    );
    console.log(responseModule);

    setModules(responseModule.data.modules);
    setModuleOrder(responseModule.data.moduleOrder);
    setLessonOrder(responseModule.data.lessonOrder);
    setCourseName(responseModule.data.nameCourse);
    setTrailName(responseModule.data.nameTrail);
  };

  useEffect(() => {
    if (user?.email) {
      const func = async () => {
        const responseUser = await api.get(`/user/${user.email}`);
        setLessonsWatched(responseUser.data.user.watched);
        getInfoLesson();
      };
      func();
    }
  }, [user]);

  const getBreadcrumbs = () => {
    const linkHome = { title: "Home", link: "/dashboard" };
    const linkTrails = { title: "Cursos", link: "/dashboard/trilhas" };
    const linkCourses = {
      title: `${trailName}`,
      link: `/dashboard/trilhas/${trailId}`,
    };
    const linkCourse = {
      title: `${courseName}`,
      link: `/dashboard/trilhas/${trailId}/curso/${courseId}`,
    };
    const linkLesson = {
      title: `Aula ${moduleOrder}.${lessonOrder}`,
      link: "#",
    };
    return [linkHome, linkTrails, linkCourses, linkCourse, linkLesson];
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
        <h1>{courseName.toUpperCase()}</h1>
        {modules &&
          modules.map((module, index) => {
            let lessonsArray: any = [];
            let indexMod = index + 1;

            module.lessons.map((lesson, index) => {
              // console.log(lesson.completed);
              lessonsArray.push({
                id: lesson.id,
                name: ` Aula ${indexMod}.${index + 1} - ${lesson.name}`,
                url: lesson.embedUrl,
                completed: lesson.completed,
                description: lesson.description,
                order: lesson.order,
                duration: "(mm:ss)",
                type: "video",
                onClickItem: () => {
                  navigate(
                    `/dashboard/trilhas/${trailId}/curso/${courseId}/aulas/${lesson.id}`
                  );
                  window.location.reload();
                },
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
