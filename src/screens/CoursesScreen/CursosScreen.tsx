// React
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// API
import { api } from "../../services/api";

// Styles
import styles from "./CursosScreen.module.css";

// Context
import { useAuth } from "../../context/AuthContext";

// Types
import { UserLessons, Trail, CourseResponse } from "../types/CourseTypes";

// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconPlan from "@mui/icons-material/CalendarTodayOutlined";
import IconProgress from "@mui/icons-material/TrendingUpOutlined";

// Components
import CardProgress from "./Components/CardProgress/CardProgress";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import CardCourse from "./Components/CardCourse/CardCourse";
import CardAddCourse from "./Components/CardAddCourse/CardAddCourse";
import CardSyllabus from "./Components/CardSyllabus/CardSyllabus";

const CursosScreenTeste = () => {
  const [intern, setIntern] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const location = useLocation();
  let trailId = location.pathname.replace("/dashboard/trilhas/", "");

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
    main: "",
  });

  const [addCourseIsOpen, setAddCourseIsOpen] = useState(false);
  const [syllabusIsOpen, setSyllabusIsOpen] = useState(false);
  const [progressIsOpen, setProgressIsOpen] = useState(false);
  const [editCourseIsOpen, setEditCourseIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [userByEmail, setUserByEMail] = useState<any>();
  const [coursesUser, setCoursesUser] = useState<UserLessons[]>([]);

  useEffect(() => {
    if (user?.email) {
      const func = async () => {
        const responseByEmail = await api.get(`/user/${user.email}`);
        // console.log(responseByEmail);

        // responseByEmail.data.user.role === "STUDENT"
        //   ? setIntern(true)
        //   : setIntern(false);

        const responseCourses = await api.get(
          `/user/watched/${user.email}?trailId=${trailId}`
        );

        setTrail(responseCourses.data.maxLessons[0]?.trail);
        setCoursesUser(responseCourses.data.maxLessons);
        // console.log(responseCourses.data);

        setUserByEMail(responseByEmail.data.userWithLevel);
      };
      func();
    }
  }, [user]);

  const onSubmitCourse = () => {
    setAddCourseIsOpen(false);

    // if (!addCourseIsOpen)
    window.location.reload();
  };

  useEffect(() => {
    const func = async () => {
      const responseCourse = await api.get(`/trail/course/${trailId}`);
      setData(responseCourse.data.course);
    };
    func();
  }, []);

  if (data.length === 0) return <div>loading...</div>;

  return (
    <div className={styles.center}>
      <div className={styles.container_cursos}>
        <Breadcrumb
          breadcrumbItems={[
            { title: "Home", link: "/dashboard" },
            { title: "Cursos", link: "/dashboard/trilhas" },
            { title: `${trail?.name}`, link: "#" },
          ]}
        />
        <div className={styles.title}>
          <p>{`${trail?.name}`}</p>
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
            <CardSyllabus
              user={userByEmail?.role.toLowerCase()}
              onClose={() => setSyllabusIsOpen(false)}
            />
          )}
          {progressIsOpen && (
            <CardProgress
              trailId={trailId}
              onClose={() => setProgressIsOpen(false)}
            />
          )}
          {addCourseIsOpen && (
            <CardAddCourse onClose={() => onSubmitCourse()} />
          )}
        </div>
        <div className={styles.cards}>
          {!intern
            ? data.map((course: CourseResponse, index) => (
                <CardCourse
                  intern={intern}
                  onClickIrAoCurso={() =>
                    navigate(`/dashboard/trilhas/${trailId}/curso/${course.id}`)
                  }
                  onClickColectEmblem={() => console.log("Coletou o emblema")}
                  onClickEditCourse={() => {
                    setSelectedCourse(course);
                    setEditCourseIsOpen(true);
                  }}
                  key={index}
                  index={index}
                  title={course.name}
                  concluded={1}
                  emblem={false} //falta ver
                  type={course.courseStyle}
                />
              ))
            : coursesUser.map((course, index) => (
                <CardCourse
                  key={index}
                  index={index}
                  intern={intern}
                  onClickIrAoCurso={() =>
                    navigate(`/dashboard/trilhas/${trailId}/curso/${course.id}`)
                  }
                  onClickColectEmblem={() => console.log("Coletou o emblema")}
                  onClickEditCourse={() => setEditCourseIsOpen(true)}
                  title={course.name}
                  concluded={
                    course.completed ? 1 : course.userLessonsLength > 0 ? 2 : 3
                  }
                  emblem={true} //falta ver
                  type={course.courseStyle}
                />
              ))}

          {editCourseIsOpen && (
            <CardAddCourse
              course={selectedCourse}
              addCourse={false}
              onClose={() => setEditCourseIsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CursosScreenTeste;
