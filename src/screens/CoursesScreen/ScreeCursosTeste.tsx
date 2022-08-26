import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import CardCourse from "./Components/CardCourse/CardCourse";
import styles from "./CursosScreen.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardAddCourse from "./Components/CardAddCourse/CardAddCourse";
import TrailModal from "../../components/TrailModal/TrailModal";
import { api } from "../../services/api";
import SocialButton from "../../components/SocialButton/SocialButton";
import { useAuth } from "../../context/AuthContext";

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
  profile: Profile;
  course: CourseResponse[];
}

interface Trail {
  id: string;
  name: string;
  description: string;
  weight: number;
  course: CourseResponse[];
}

interface Module {
  id: string;
  name: string;
  courseId: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
}

interface CourseResponse {
  id: string;
  name: string;
  description: string;
  level: "LOW" | "MEDIUM" | "HIGH";
  workload: number;
  learning: string;
  skills: string;
  trailId: string;
  teacherId: string;
  modules: Module[];
}

interface CoursesUser {
  course_id: number;
  lastWatched_class_id: string;
  watched: Array<string>;
  completed: boolean;
  emblem: boolean;
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
  user: User,
  intern: boolean,
  onClickEditCourse: () => void
) => {
  let concluded = 3;
  let emblem = false;

  user.trilhas.map(
    (trilhaUser) =>
      trilhaUser.trilha == trilha_id &&
      trilhaUser.courses.map((cursoUser) => {
        if (cursoUser.course_id === curso.id) {
          emblem = cursoUser.emblem;
          if (cursoUser.completed) concluded = 1;
          else concluded = 2;
        }
      })
  );

  return (
    <CardCourse
      intern={intern}
      onClickIrAoCurso={() => console.log("Foi para o curso")}
      onClickColectEmblem={() => console.log("Coletou o emblema")}
      onClickEditCourse={onClickEditCourse}
      key={index}
      title={curso.name}
      concluded={concluded}
      emblem={emblem}
    />
  );
};

// async function loadCourse() {
// const response = await api.get(`/course/`);
// console.log(response.data);
// }

const CursosScreenTeste = () => {
  // Usuário
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState<UserResponse>();
  const [courseId, setCourseId] = useState("");
  // const [email, setEmail] = useState<string>("");

  // let email = user.email;
  // console.log(user.email);

  // Declaração de variáveis
  const location = useLocation();
  let trilhaId = location.pathname.replace("/trilhas/", "");
  let trilha_id = parseInt(location.pathname.replace("/trilhas/", ""));
  const [addCourseIsOpen, setAddCourseIsOpen] = useState(false);
  const [editCourseIsOpen, setEditCourseIsOpen] = useState(false);
  // const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  // console.log(user);

  useEffect(() => {
    const func = async () => {
      const responseUser = await api.get(`/user/`);
      // console.log(responseUser.data);
      // responseUser.data.map((user: UserResponse) => console.log(user.email));

      setUsers(responseUser.data);

      // const response = await api.get<CourseResponse[]>(`/course/`);
      const response = await api.get(`/course/`);
      const data = response.data;
      // console.log(data.courses[0].name);
      setTitle(data.courses[0].name);
      setData(data.courses);
      // setGetUsers(responseUser.data);
    };
    func();
  }, []);
  // const emaili = "email";
  useEffect(() => {
    users.map(
      (userMap: UserResponse) =>
        userMap.email === user.email && setCurrentUser(userMap)
    );
    console.log(currentUser);
  }, [users]);

  // console.log(email);

  // users.map((currentUser) => console.log(currentUser.));
  // console.log(users);

  // getUsers && getUsers.map((getUser) => console.log(getUser.email));

  // console.log("titulo:  " + title);
  // console.log(idCourse);

  // const data = func();
  // console.log(data);

  // useEffect(() => {
  //   // loadCourse();
  //   const func = async () => {
  //     const response = await api.get(`/course/`);
  //     return response.data;
  //   };
  //   // const data = {};
  //   // data = func();
  //   // setData(data);
  // }, []);

  // console.log(data);

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
            emblem: false,
          },
          {
            course_id: 2,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: [],
            completed: true,
            emblem: false,
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

  const intern = false;

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
          {!intern && (
            <ButtonWithIcon
              onClick={() => setAddCourseIsOpen(true)}
              icon={<AddCircleOutlineIcon />}
              width={218}
              position="right"
              type="primary"
              text="Adicionar curso"
              size="medium"
            />
          )}
          {addCourseIsOpen && (
            <CardAddCourse onClose={() => setAddCourseIsOpen(false)} />
          )}
        </div>
        <div className={styles.cards}>
          {!intern &&
            data.map(
              (course: CourseResponse, index) =>
                course.trailId === trilhaId && (
                  <CardCourse
                    intern={intern}
                    onClickIrAoCurso={() => console.log("Foi para o curso")}
                    onClickColectEmblem={() => console.log("Coletou o emblema")}
                    onClickEditCourse={() => {
                      setCourseId(course.id);
                      setEditCourseIsOpen(true);
                    }}
                    key={index}
                    title={course.name}
                    concluded={1}
                    emblem={false}
                  />
                )
            )}

          {intern &&
            courses.map(
              (curso, index) =>
                curso.trilha === trilha_id &&
                renderCard(index, curso, trilha_id, userTeste, intern, () =>
                  setEditCourseIsOpen(true)
                )
            )}

          {editCourseIsOpen && (
            <CardAddCourse
              addCourse={false}
              idCourse={courseId}
              onClose={() => setEditCourseIsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CursosScreenTeste;
