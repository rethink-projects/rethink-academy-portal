import { useLocation } from "react-router-dom";
import Acordeon from "../../components/Acordeon/Acordeon";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Class.module.css";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

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
  course: CourseResponse[];
}

interface Trail {
  id: string;
  name: string;
  description: string;
  weight: number;
  course?: CourseResponse[];
}

interface ModuleResponse {
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
  teacherId: string;
  modules: ModuleResponse[];
  teacher: UserResponse;
  type: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

///////////////////////////////////////////////////

const Class = () => {
  // Buscando id's
  const { user } = useAuth();
  const location = useLocation();
  let id = location.pathname.split("/");

  const idTrail = id[2];
  const idCourse = id[4];
  const idClass = id[6];
  // console.log(id);

  // replace("/trilhas/asd/curso/ads/aulas", "").split();
  // console.log(idCourse);
  const [module, setModule] = useState<ModuleResponse>({
    id: "",
    name: "",
    courseId: "",
    lessons: [],
    order: 1,
  });
  const [modules, setModules] = useState<ModuleResponse[]>([]);
  const [lesson, setLesson] = useState<Lesson>();
  const [course, setCourse] = useState<CourseResponse>({
    id: "",
    name: "",
    description: "",
    level: "LOW",
    workload: 0,
    learning: "",
    skills: "",
    trailId: "",
    teacherId: "",
    modules: [],
    teacher: {
      id: "",
      email: "",
      name: "",
      surname: "",
      main: "",
      watched: [],
      role: "STUDENT",
      // profile?: Profile,
      course: [],
    },
    type: "COURSE",
  });

  useEffect(() => {
    if (user?.email) {
      // console.log(user.email);
      const func = async () => {
        const responseCourse = await api.get(`/course/${idCourse}`);

        setCourse(responseCourse.data.course);
        setModules(responseCourse.data.course.modules);

        const responseClass = await api.get(`/lesson/${idClass}`);

        setLesson(responseClass.data.lesson);
      };
      func();
    }
  }, [user]);
  // modules.map((module) => console.log(module.lessons));

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
      <div className={styles.class_class}>
        <Breadcrumb breadcrumbItems={getBreadcrumbs()} />
        <div className={styles.class_title}>
          <IconVideoCam />
          <h1>
            Aula {lesson?.module.order}.{lesson?.order} - {lesson?.name}
          </h1>
        </div>
        <div className={styles.class_video}>
          <iframe
            className="video"
            src={lesson?.embedUrl}
            title="Loom 01"
            width={1040}
            height={585}
          ></iframe>
          {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mE2KYOPtcCi8_PQf8QPYrG0k14Cd0Fux6w&usqp=CAU"
            width={1040}
            height={585}
          /> */}
        </div>
        <div className={styles.class_description}>
          <h1>Sobre a aula:</h1>
          <p>
            {lesson?.description}
            {/* Aprenda a executar pesquisas de UX Design, fazer testes de
            usabilidade e elaborar análises, além de utilizar frameworks e
            métodos para a criação de designs de qualidade e que ofereçam uma
            boa experiência ao usuário. Ao concluir as aulas, você estará pronto
            para definir processos e construir frameworks baseados em estudos
            sobre as necessidades dos usuários, seus objetivos, habilidades e
            limitações, para alcançar os objetivos de negócios. */}
          </p>
        </div>
      </div>
      <div className={styles.class_class_list}>
        <h1>{course.name.toUpperCase()}</h1>
        {modules &&
          modules.map((module, index) => (
            <Acordeon
              key={index}
              module={{
                id: parseInt(module.id),
                name: module.name,
                blocked: false,
                completed: true,
                // classes: {}
                //  id: string;
                // name: string;
                // embedUrl: string;
                // order: number;
                // description: string;
                // moduleId: string;
                // module: {
                //   order: number;
                // };
                classes: [
                  {
                    id: "xasdxcdefewr",
                    name: "Cores",
                    url: "link",
                    completed: true,
                    description: "texto de descrição",
                    order: 1,
                    duration: "(mm:ss)",
                    type: "video",
                  },
                  {
                    id: "birubrib",
                    name: "Grid",
                    url: "link",
                    completed: true,
                    description: "texto de descrição",
                    order: 2,
                    duration: "(mm:ss)",
                    type: "video",
                  },
                ],
              }}
            />
          ))}
        {/* <Acordeon
          module={{
            id: 1,
            name: "UI Design",
            blocked: false,
            completed: true,
            classes: [
              {
                id: "xasdxcdefewr",
                name: "Cores",
                url: "link",
                completed: true,
                description: "texto de descrição",
                order: 1,
                duration: "(mm:ss)",
                type: "video",
              },
              {
                id: "birubrib",
                name: "Grid",
                url: "link",
                completed: true,
                description: "texto de descrição",
                order: 2,
                duration: "(mm:ss)",
                type: "video",
              },
            ],
          }}
        /> */}
        {/* <Acordeon />
        <Acordeon /> */}
      </div>
    </div>
  );
};

export default Class;
