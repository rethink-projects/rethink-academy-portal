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
type classProps = {
  title: string;
  description: string;
  module?: Module;
};

type Module = {
  id: number;
  name: string;
  blocked: boolean;
  completed: boolean;
  classes?: Array<Class>;
  order: number;
};
type Class = {
  id: string;
  name: string;
  url: string;
  completed: boolean;
  description: string;
  order: number;
  duration: string;
  type: "video" | "audio" | "activity";
};

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
        // const responseUserByEmail = await api.get(`/user/${user.email}`);
        // console.log(responseUserByEmail.data.user);
        //
        const responseCourse = await api.get(`/course/${idCourse}`);
        // console.log(responseCourse.data.course);
        setCourse(responseCourse.data.course);
        setModules(responseCourse.data.course.modules);

        const responseClass = await api.get(`/lesson/${idClass}`);
        // console.log(responseClass);

        setLesson(responseClass.data.lesson);
        // set;
        // setModule(responseClass.data.lesson.module);
        // setCourse(responseClass.data.lesson.module.course);

        // console.log(responseClass.data.lesson);

        // console.log(idClass);

        // const responseCourses = await api.get(
        //   `/user/watched/${user.email}?trailId=${idTrail}`
        // );
        // console.log(responseCourses);

        //  const responseCourses = await api.get(
        //    `/user/watched/${user.email}?trailId=${trilhaId}`
        //  );
        //  setCoursesUser(responseCourses.data.maxLessons);
      };
      func();
    }
  }, [user]);
  // console.log(course);
  // console.log(lesson);
  modules.map((module) => console.log(module.lessons));
  // console.log(modules.);

  //  useEffect(() => {
  //    const func = async () => {
  //      const response = await api.get(`/course/`);
  //      const responseTrail = await api.get(`/trail/${trilhaId}`);
  //      setTrail(responseTrail.data);

  //      setData(response.data.courses);
  //    };
  //    func();
  //  }, []);

  const courses = [
    {
      id: 1,
      name: "Nothink",
      trilha: 3,
      lastCourse: 4,
      completed: false,
      description: "descrição",
    },
  ];

  const classes = [
    {
      id: "iax9dhaiudshasip1",
      name: "class_01",
      url: "nothink-video-01.com",
      trilha: 3,
      courses: 1,
      order: 1,
      description: "descrição",
      module: 1,
    },
    {
      id: "iax9dhaiudshasip2",
      name: "class_02",
      url: "nothink-video-02.com",
      trilha: 3,
      courses: 1,
      order: 2,
      description: "descrição",
      module: 1,
    },
    {
      id: "iax9dhaiudshasip3",
      name: "class_02",
      url: "nodeJS-video-01.com",
      trilha: 3,
      courses: 2,
      order: 1,
      description: "descrição",
      module: 2,
    },
  ];

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
          modules.map((module) => (
            <Acordeon
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
