import { useLocation } from "react-router-dom";
import Acordeon from "../../components/Acordeon/Acordeon";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Class.module.css";
import IconVideoCam from "@mui/icons-material/VideocamOutlined";

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
  const location = useLocation();

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
          <h1>Aula 1.1 - O que é UX Design? (07:50)</h1>
        </div>
        <div className={styles.class_video}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mE2KYOPtcCi8_PQf8QPYrG0k14Cd0Fux6w&usqp=CAU"
            width={1040}
            height={585}
          />
        </div>
        <div className={styles.class_description}>
          <h1>Sobre a aula:</h1>
          <p>
            Aprenda a executar pesquisas de UX Design, fazer testes de
            usabilidade e elaborar análises, além de utilizar frameworks e
            métodos para a criação de designs de qualidade e que ofereçam uma
            boa experiência ao usuário. Ao concluir as aulas, você estará pronto
            para definir processos e construir frameworks baseados em estudos
            sobre as necessidades dos usuários, seus objetivos, habilidades e
            limitações, para alcançar os objetivos de negócios.
          </p>
        </div>
      </div>
      <div className={styles.class_class_list}>
        <h1>UX DESIGN</h1>
        <Acordeon
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
        />
        <Acordeon />
        <Acordeon />
      </div>
    </div>
  );
};

export default Class;
