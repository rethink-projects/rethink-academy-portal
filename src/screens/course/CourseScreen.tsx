import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Acordeon from "./components/Accordion/Accordion";
import CardInfoCurso from "./components/card/CardInfoCurso";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import ModuleModal from "./components/ModuleModal/ModuleModal";
import IconEdit from "@mui/icons-material/EditOutlined";
import IconFolder from "@mui/icons-material/CreateNewFolderOutlined";
import IconPlus from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import styles from "./CourseScreen.module.css";
import CardAddCourse from "../CoursesScreen/Components/CardAddCourse/CardAddCourse";
import { CourseResponse } from "../types/CourseTypes";

type TypeCourse = {
  id: string;
  name: string;
  description: string;
  level: "LOW" | "MEDIUM" | "HIGH";
  workload: number;
  learning: string;
  skills: string;
  trailId: string;
  modules: TypeModule[];
  teacherName: string;
  teacherDescription: string;
  imageTeacher: string;
  courseStyle: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
};

type TypeModule = {
  id: string;
  name: string;
  courseId: string;
  lessons: TypeLesson[];
};
type TypeLesson = {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
};
type TypeProfile = {
  id: string;
  bio: string;
  avatar: string;
  social: {};
  userId: string;
  user: TypeUser;
};
type TypeUser = {
  id: string;
  email: string;
  name: string;
  surname: string;
  main: string;
  watched: string[];
  role: string;
};

type TypeModal = "add" | "edit" | "delete";

const CourseScreen = () => {
  const location = useLocation();
  const [watcheds, setWatcheds] = useState<string[]>([]);
  const [modules, setModules] = useState<TypeModule[]>([]);
  const [modalModule, setModule] = useState<TypeModule>();
  // const [course, setCourse] = useState<TypeCourse>();
  const [course, setCourse] = useState<TypeCourse>();

  const [nameTrail, setNameTrail] = useState("");
  const [embassador, setEmbassador] = useState<boolean>();

  const [classModalIsOpen, setClassModalIsOpen] = useState(false);
  const [moduleModalIsOpen, setModuleModalIsOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleModalType, setModuleModalType] = useState<TypeModal>("add");
  const trailId = location.pathname.split("/")[3];
  const courseId = location.pathname.split("/")[5];

  let userEmail = "";
  const { user } = useAuth();
  if (user) userEmail = user.email;

  const [totalModules, setTotalModules] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  console.log(course);

  useEffect(() => {
    course && setTotalModules(course.modules.length);
    let lessons = 0;
    course &&
      course?.modules.map((module: TypeModule) => {
        // console.log("um modulo");
        lessons += module.lessons.length;
      });
  }, [course]);

  useEffect(() => {
    if (userEmail !== "") {
      axios
        .get("http://localhost:4000/api/user/" + userEmail)
        .then((response) => {
          if (response.data.userWithLevel) {
            setEmbassador(response.data.userWithLevel.role === "STUDENT");
          }
        });

      axios
        .get("http://localhost:4000/api/user/watched/list/" + userEmail)
        .then((response) => {
          if (response.data.watched) {
            setWatcheds(response.data.watched);
          }
        });
    }
  }, [userEmail]);

  useEffect(() => {
    if (courseId !== "") {
      axios
        .get("http://localhost:4000/api/course/" + courseId)
        .then((response) => {
          if (response.data.course) {
            setCourse(response.data.course);
            setNameTrail(response.data.course.trail.name);
          }
        });
      axios
        .get("http://localhost:4000/api/course/" + courseId + "/modules")
        .then((response) => {
          if (response.data.modules) {
            setModules(response.data.modules);
          }
        });
    }
  }, []);

  if (
    !user ||
    course === undefined ||
    userEmail === "" ||
    embassador === undefined
  ) {
    // console.log(user);
    // console.log(course);
    // console.log(embassador);
    return <div>Loading...</div>;
  }

  const isBlocked = (moduleId: string) => {
    if (embassador) return false;
    // console.log("Não sou embaçador");

    let i = 1;
    //se o módulo for o primeiro
    if (moduleId === modules[0].id) return false;

    //se o módulo anterior tiver sido concluído
    let anteriorModule: TypeModule = modules[0];

    while (modules[i].id !== moduleId) {
      anteriorModule = modules[i];
      i++;
    }
    return !isCompleted(anteriorModule.id);
  };

  const isCompleted = (moduleId: string) => {
    if (embassador) return true;
    let completedStatus = true;
    let module: TypeModule;
    let i = 0;
    if (modules.length === 1) {
      module = modules[0];
    } else {
      while (modules[i].id !== moduleId) {
        module = modules[i];
        i++;
      }
      module = modules[i];
    }
    module.lessons.forEach((lesson) => {
      if (!watcheds.includes(lesson.id)) {
        completedStatus = false;
      }
    });
    return completedStatus;
  };

  const getLevel = (level: string) => {
    if (level === "HIGH") return "Avançado";
    if (level === "MEDIUM") return "Intermediário";
    return "Iniciante";
  };

  const setAddModuleModal = () => {
    setModule(undefined);
    setModuleModalType("add");
    setModuleModalIsOpen(true);
    setModuleName("");
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.content_course}>
          <Breadcrumb
            breadcrumbItems={[
              { title: "Home", link: "/dashboard" },
              { title: "Cursos", link: "/dashboard/trilhas" },
              {
                title: `${nameTrail}`,
                // title: `nome da trilha`,
                link: `/dashboard/trilhas/${trailId}`,
              },
              {
                title: `${course.name}`,
                link: "#",
              },
            ]}
          />
          <div className={styles.header}>
            <div className={styles.header_left}>
              <h1 className={styles.title}>{course.name}</h1>
              <h2 className={styles.about}>Sobre o Curso:</h2>
            </div>
            {embassador && (
              <div className={styles.header_right}>
                <ButtonWithIcon
                  icon={<IconEdit />}
                  text={"Editar curso"}
                  position={"right"}
                  size={"medium"}
                  type={"secondary"}
                  width={218}
                  onClick={() => setClassModalIsOpen(true)}
                />
                <ButtonWithIcon
                  icon={<IconPlus />}
                  text={"Adicionar módulo"}
                  position={"right"}
                  size={"medium"}
                  type={"primary"}
                  width={218}
                  onClick={setAddModuleModal}
                />
              </div>
            )}
          </div>
          <p className={styles.description}>{course.description}</p>

          {classModalIsOpen && (
            <CardAddCourse
              course={course}
              addCourse={false}
              onClose={() => setClassModalIsOpen(false)}
            />
          )}

          <h2 className={styles.title_modules}>Lista de Conteúdos:</h2>

          {moduleModalIsOpen && (
            <ModuleModal
              onClose={() => setModuleModalIsOpen(false)}
              type={moduleModalType}
              setModuleName={setModuleName}
              moduleName={moduleName}
              modules={modules}
              module={modalModule}
              courseId={courseId}
            />
          )}
          <div className={styles.modules}>
            <>
              {modules.map((module, index) => (
                <Acordeon
                  key={module.id}
                  embassador={embassador}
                  width={848}
                  position={index + 1}
                  blocked={isBlocked(module.id)}
                  completed={isCompleted(module.id)}
                  watcheds={watcheds}
                  module={module}
                  setModule={setModule}
                  openModuleModal={setModuleModalIsOpen}
                  setModuleModalType={setModuleModalType}
                  setModuleName={setModuleName}
                />
              ))}
            </>
          </div>
          {modules.length === 0 && (
            <div className={styles.no_modules}>
              <IconFolder
                sx={{ fontSize: 80, color: "var(--color-tertiary-hover)" }}
              />
              <span>Este curso ainda não possui nenhum módulo.</span>
              <ButtonWithIcon
                icon={<IconPlus />}
                text={"Adicionar módulo"}
                position={"right"}
                size={"medium"}
                type={"primary"}
                width={218}
                onClick={() => setModuleModalIsOpen(true)}
              />
            </div>
          )}
        </div>
        <div className={styles.practical_information}>
          <div className={styles.card_info}>
            <CardInfoCurso
              author={course.teacherName}
              authorDescription={course.teacherDescription}
              level={getLevel(course.level)}
              learn={course.learning}
              module_class={{
                module: totalModules,
                class: totalLessons,
              }}
              skills={course.skills}
              avatar={course.imageTeacher}
              workload={course.workload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseScreen;
