import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import CardCourse from "./Components/CardCourse/CardCourse";
import styles from "./CursosScreen.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardAddCourse from "./Components/CardAddCourse/CardAddCourse";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface UserLessons {
  completed: boolean;
  id: string;
  lessonsLength: number;
  name: string;
  trail: Trail;
  userLessonsLength: number;
  type: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
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
  course: CourseResponse[];
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
}

interface Lesson {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
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
  modules: Module[];
  teacher: UserResponse;
  type: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

const CursosScreenTeste = () => {
  // Usuário
  const { user } = useAuth();
  const [courseId, setCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseResponse>(
    {} as CourseResponse
  );

  const [intern, setIntern] = useState(false);

  // Declaração de variáveis
  const location = useLocation();
  const [trail, setTrail] = useState<Trail>({
    id: "",
    name: "",
    description: "",
    weight: 0,
  });
  let trilhaId = location.pathname.replace("/trilhas/", "");

  const [addCourseIsOpen, setAddCourseIsOpen] = useState(false);
  const [editCourseIsOpen, setEditCourseIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const [coursesUser, setCoursesUser] = useState<UserLessons[]>([]);

  useEffect(() => {
    if (user?.email) {
      const func = async () => {
        const responseByEmail = await api.get(`/user/${user.email}`);
        // responseByEmail.data.user.role === "STUDENT"
        //   ? setIntern(true)
        //   : setIntern(false);

        const responseCourses = await api.get(
          `/user/watched/${user.email}?trailId=${trilhaId}`
        );
        setCoursesUser(responseCourses.data.maxLessons);
      };
      func();
    }
  }, [user]);

  useEffect(() => {
    const func = async () => {
      const response = await api.get(`/course/`);
      const responseTrail = await api.get(`/trail/${trilhaId}`);
      setTrail(responseTrail.data);

      setData(response.data.courses);
    };
    func();
  }, []);
  // console.log(trail);

  // Convertendo a primeira letra da trilha para maiúsculo
  // let trailName = trail.name;
  // console.log(trailName);

  // trailName = trailName[0].toUpperCase() + trailName.slice(1);
  // trailName = trailName.toUpperCase();
  // let letra = trailName[0].toUpperCase();
  // console.log(letra);
  // console.log(trailName);

  // selectedTrack = selectedTrack[0].toUpperCase() + selectedTrack.slice(1);

  // const trail = trilha_id === 3 ? "Engenharia" : trilha_id

  // const intern = currentUser.role === "STUDENT" ? true : false;

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
          <p>{`Programa de Cursos | ${trail.name}`}</p>
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
          {!intern
            ? data.map(
                (course: CourseResponse, index) =>
                  course.trailId === trilhaId && (
                    <CardCourse
                      intern={intern}
                      onClickIrAoCurso={() => console.log("Foi para o curso")}
                      onClickColectEmblem={() =>
                        console.log("Coletou o emblema")
                      }
                      onClickEditCourse={() => {
                        setCourseId(course.id);
                        setSelectedCourse(course);
                        setEditCourseIsOpen(true);
                      }}
                      key={index}
                      title={course.name}
                      concluded={1}
                      emblem={false}
                      type={course.type}
                    />
                  )
              )
            : coursesUser.map((course, index) => (
                <CardCourse
                  key={index}
                  intern={intern}
                  onClickIrAoCurso={() => console.log("Foi para o curso")}
                  onClickColectEmblem={() => console.log("Coletou o emblema")}
                  onClickEditCourse={() => setEditCourseIsOpen(true)}
                  title={course.name}
                  concluded={
                    course.completed ? 1 : course.userLessonsLength > 0 ? 2 : 3
                  }
                  emblem={true} //falta ver
                  type={course.type}
                />
              ))}

          {editCourseIsOpen && (
            <CardAddCourse
              course={selectedCourse}
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
