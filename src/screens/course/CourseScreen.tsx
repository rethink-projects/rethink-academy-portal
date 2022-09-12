// API & CONTEXTS
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS
import Acordeon from "./components/Accordion/Accordion";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import CardInfoCurso from "./components/card/CardInfoCurso";
import ModuleModal from "./components/ModuleModal/ModuleModal";

// ICONS
import IconEdit from "@mui/icons-material/EditOutlined";
import IconInfo from "@mui/icons-material/InfoOutlined";
import IconPlus from "@mui/icons-material/AddCircleOutline";

// STYLES
import styles from "./CourseScreen.module.css";
import CardAddCourse from "../CoursesScreen/Components/CardAddCourse/CardAddCourse";
import { CourseResponse } from "../types/CourseTypes";
import Tooltip from "../../components/Tooltip/Tooltip";

type TypeModule = {
  id: string;
  name: string;
  courseId: string;
  lessons: TypeLesson[];
  blocked: boolean;
  completed: boolean;
};
type TypeLesson = {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
};

type TypeModal = "add" | "edit" | "delete";

const CourseScreen = () => {
  const location = useLocation();
  const [watched, setWatched] = useState<string[]>([]);
  const [modules, setModules] = useState<TypeModule[]>([]);
  const [modalModule, setModule] = useState<TypeModule>();
  const [course, setCourse] = useState<CourseResponse>();

  const [trailName, setTrailName] = useState("");
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

  useEffect(() => {
    course && setTotalModules(modules.length);
    let lessons = 0;
    course &&
      modules.map((module: TypeModule) => {
        lessons += module.lessons.length;
      });
    setTotalLessons(lessons);
  }, [course]);

  useEffect(() => {
    if (courseId !== "" && userEmail !== "") {
      const getCourse = async () => {
        const response = await api.get(`/course/${courseId}/${userEmail}`);
        setCourse(response.data.course);
        setTrailName(response.data.course.trail.name);
        setEmbassador(response.data.role === "EMBASSADOR");
        setModules(response.data.modules);
        setWatched(response.data.watched);
      };
      getCourse();
    }
  }, [userEmail]);

  if (
    !user ||
    course === undefined ||
    userEmail === "" ||
    embassador === undefined
  ) {
    return <div>Loading...</div>;
  }

  // const isBlocked = (moduleId: string) => {
  //   if (embassador) return false;

  //   let i = 1;
  //   //se o módulo for o primeiro
  //   if (moduleId === modules[0].id) return false;

  //   //se o módulo anterior tiver sido concluído
  //   let anteriorModule: TypeModule = modules[0];

  //   while (modules[i].id !== moduleId) {
  //     anteriorModule = modules[i];
  //     i++;
  //   }
  //   return !isCompleted(anteriorModule.id);
  // };

  const isCompleted = (moduleId: string) => {
    if (embassador) return true;
    let completedStatus = true;
    let module: TypeModule;
    let i = 0;
    if (modules.length === 1) {
      return false;
    }
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
      if (!watched.includes(lesson.id)) {
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
                title: `${trailName.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
                  letra.toUpperCase()
                )}`,
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
                  position={"left"}
                  size={"medium"}
                  type={"secondary"}
                  width={218}
                  onClick={() => setClassModalIsOpen(true)}
                />
                <ButtonWithIcon
                  icon={<IconPlus />}
                  text={"Adicionar módulo"}
                  position={"left"}
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
          {modules.length > 0 ? (
            <div className={styles.modules}>
              <>
                {modules.map((module, index) =>
                  module.blocked ? (
                    <Tooltip
                      content={
                        embassador
                          ? "Atualize a página para editar"
                          : "Módulo bloqueado! Para destravá-lo e ter acesso a este conteúdo, conclua o módulo anterior."
                      }
                      direction={embassador ? "top" : "bottom-right"}
                      key={"tooltip" + index}
                      // style={{ zIndex: 1 }}
                    >
                      <Acordeon
                        key={module.id}
                        embassador={embassador}
                        width={848}
                        position={index + 1}
                        // blocked={isBlocked(module.id)}
                        blocked={module.blocked}
                        completed={isCompleted(module.id)}
                        watched={watched}
                        module={module}
                        setModule={setModule}
                        openModuleModal={setModuleModalIsOpen}
                        setModuleModalType={setModuleModalType}
                        setModuleName={setModuleName}
                      />
                    </Tooltip>
                  ) : (
                    <Acordeon
                      key={module.id}
                      embassador={embassador}
                      width={848}
                      position={index + 1}
                      // blocked={isBlocked(module.id)}
                      blocked={module.blocked}
                      // completed={isCompleted(module.id)}
                      completed={module.completed}
                      watched={watched}
                      module={module}
                      setModule={setModule}
                      openModuleModal={setModuleModalIsOpen}
                      setModuleModalType={setModuleModalType}
                      setModuleName={setModuleName}
                    />
                  )
                )}
              </>
            </div>
          ) : (
            <div className={styles.no_modules}>
              <IconInfo
                // sx={{ fontSize: 65, color: "var(--color-tertiary-hover)" }}
                sx={{ fontSize: 60, color: "#EAB308" }}
              />
              <span>Este curso ainda não possui nenhum módulo.</span>
              {embassador && (
                <ButtonWithIcon
                  icon={<IconPlus />}
                  text={"Adicionar módulo"}
                  position={"left"}
                  size={"medium"}
                  type={"primary"}
                  width={218}
                  onClick={() => setModuleModalIsOpen(true)}
                />
              )}
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
