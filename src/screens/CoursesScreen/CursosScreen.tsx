import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CardCourse from "./Components/CardCourse";
import styles from "./CursosScreen.module.css";

interface CoursesUser {
  course_id: number;
  lastWatched_class_id: string;
  watched: Array<string>;
  completed: boolean;
}

type TrilhasUser = {
  trilha: number;
  courses: Array<CoursesUser>;
};

type User = {
  name: string;
  main: string;
  trilhas: Array<TrilhasUser>;
};

type Course = {
  id: number;
  name: string;
  trilha: number;
  lastCourse: number;
  completed: boolean;
  description: string;
};

type Trilhas = { name: string; id: number; description: string };

const renderCard = (
  index: number,
  curso: Course,
  trilha_id: number,
  user: User
) => {
  let concluded = 3;
  user.trilhas.map(
    (trilhaUser) =>
      trilhaUser.trilha == trilha_id &&
      trilhaUser.courses.map((cursoUser) =>
        cursoUser.course_id === curso.id
          ? cursoUser.completed
            ? (concluded = 1)
            : (concluded = 2)
          : ""
      )
  );

  return <CardCourse key={index} title={curso.name} concluded={concluded} />;
};

const CursosScreen = () => {
  // Declaração de variáveis
  const location = useLocation();
  let trilha_id = parseInt(location.pathname.replace("/trilhas/", ""));

  const userTeste: User = {
    name: "Fernando",
    main: "engenharia",
    trilhas: [
      {
        trilha: 3,
        courses: [
          {
            course_id: 1,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: ["iax9dhaiudshasip1", "iax9dhaiudshasip1"],
            completed: false,
          },
          {
            course_id: 2,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: [],
            completed: true,
          },
        ],
      },
    ],
  };

  const courses: Array<Course> = [
    {
      id: 1,
      name: "Nothink",
      trilha: 3,
      lastCourse: 4,
      completed: false,
      description: "descrição",
    },
    {
      id: 2,
      name: "NodeJS",
      trilha: 3,
      lastCourse: 24,
      completed: false,
      description: "descrição",
    },
    {
      id: 3,
      name: "React",
      trilha: 3,
      lastCourse: 20,
      completed: false,
      description: "descrição",
    },
  ];

  const trilhas: Array<Trilhas> = [
    { name: "academy", id: 1, description: "descrição" },
    { name: "design", id: 2, description: "descrição" },
    { name: "engenharia", id: 3, description: "descrição" },
    { name: "produto", id: 4, description: "descrição" },
  ];

  let selectedTrack = "";

  // Encontrando o nome da trilha escolhida com o id = trilha_id
  trilhas.map(
    (trilha) => trilha.id === trilha_id && (selectedTrack = trilha.name)
  );
  // Convertendo a primeira letra da trilha para maiúsculo
  selectedTrack = selectedTrack[0].toUpperCase() + selectedTrack.slice(1);

  return (
    <div className={styles.center}>
      <div className={styles.container_cursos}>
        <Breadcrumb
          breadcrumbItems={[
            { title: "Home", link: "/home" },
            { title: "Trilhas", link: "/trilhas" },
            { title: "Cursos", link: "#" },
          ]}
        />
        <div className={styles.title}>
          <p>{`Programa de Cursos | ${selectedTrack}`}</p>
        </div>
        <div className={styles.cards}>
          {courses.map(
            (curso, index) =>
              curso.trilha == trilha_id &&
              renderCard(index, curso, trilha_id, userTeste)
          )}
        </div>
      </div>
    </div>
  );
};

export default CursosScreen;