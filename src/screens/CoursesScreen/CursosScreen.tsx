import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import CardCourse from "./Components/CardCourse/CardCourse";
import styles from "./CursosScreen.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardAddCourse from "./Components/CardAddCourse/CardAddCourse";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import CardProgress from "./Components/CardProgress/CardProgress";
import CardSyllabus from "./Components/CardSyllabus/CardSyllabus";
import IconPlan from "@mui/icons-material/CalendarTodayOutlined";
import IconProgress from "@mui/icons-material/TrendingUpOutlined";

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
  imageUrl: string;
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
  modules: Module[];
  // teacherId: string;
  teacherName: string;
  teacherDescription: string;
  imageTeacher: string;
  type: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

const CursosScreenTeste = () => {
  const [intern, setIntern] = useState(false);

  const { user } = useAuth();
  const [courseId, setCourseId] = useState("");

  const location = useLocation();
  let trailId = location.pathname.replace("/trilhas/", "");

  const [selectedCourse, setSelectedCourse] = useState<CourseResponse>(
    {} as CourseResponse
  );

  // Declaração de variáveis
  const [trail, setTrail] = useState<Trail>({
    id: "",
    name: "",
    description: "",
    weight: 0,
    imageUrl: "",
  });

  const [addCourseIsOpen, setAddCourseIsOpen] = useState(false);
  const [syllabusIsOpen, setSyllabusIsOpen] = useState(false);
  const [progressIsOpen, setProgressIsOpen] = useState(false);
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
          `/user/watched/${user.email}?trailId=${trailId}`
        );

        setTrail(responseCourses.data.maxLessons[0].trail);
        setCoursesUser(responseCourses.data.maxLessons);
      };
      func();
    }
  }, [user]);

  useEffect(() => {
    const func = async () => {
      const responseCourse = await api.get(`/course`);
      setData(responseCourse.data.course);
    };
    func();
  }, []);

  // if (data.length === 0) return <div>loading...</div>;

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
            <div className={styles.title_buttons}>
              <ButtonWithIcon
                onClick={() => setSyllabusIsOpen(true)}
                icon={<IconPlan />}
                width={237}
                position="right"
                type="outline"
                text="Plano de Atividades"
                size="medium"
              />
              <ButtonWithIcon
                onClick={() => setProgressIsOpen(true)}
                icon={<IconProgress />}
                width={169}
                position="right"
                type="outline"
                text="Progresso"
                size="medium"
              />
              <ButtonWithIcon
                onClick={() => setAddCourseIsOpen(true)}
                icon={<AddCircleOutlineIcon />}
                width={218}
                position="right"
                type="primary"
                text="Adicionar curso"
                size="medium"
              />
            </div>
          )}
          {syllabusIsOpen && (
            <CardSyllabus onClose={() => setSyllabusIsOpen(false)} />
          )}
          {progressIsOpen && (
            <CardProgress onClose={() => setProgressIsOpen(false)} />
          )}
          {addCourseIsOpen && (
            <CardAddCourse onClose={() => setAddCourseIsOpen(false)} />
          )}
        </div>
        <div className={styles.cards}>
          {!intern &&
            // ? data.map(
            //     (course: CourseResponse, index) =>
            //       course.trailId === trailId && (
            //         <CardCourse
            //           intern={intern}
            //           onClickIrAoCurso={() => console.log("Foi para o curso")}
            //           onClickColectEmblem={() =>
            //             console.log("Coletou o emblema")
            //           }
            //           onClickEditCourse={() => {
            //             setCourseId(course.id);
            //             setSelectedCourse(course);
            //             setEditCourseIsOpen(true);
            //           }}
            //           key={index}
            //           index={index}
            //           title={course.name}
            //           concluded={1}
            //           emblem={false} //falta ver
            //           type={course.type}
            //         />
            //       )
            //   )
            // :
            coursesUser.map((course, index) => (
              <CardCourse
                key={index}
                index={index}
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
