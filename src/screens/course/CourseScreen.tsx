/* eslint-disable react-hooks/exhaustive-deps */
// API & CONTEXTS
import { api } from "../../services/backend/Api";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS
import Accordion from "./components/Accordion/Accordion";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import CardInfoCurso from "./components/card/CardInfoCurso";
import ModuleModal from "./components/ModuleModal/ModuleModal";
import CardAddCourse from "../CoursesScreen/Components/CardAddCourse/CardAddCourse";
import Tooltip from "../../components/Tooltip/Tooltip";

// ICONS
import IconEdit from "@mui/icons-material/EditOutlined";
import IconInfo from "@mui/icons-material/InfoOutlined";
import IconPlus from "@mui/icons-material/AddCircleOutline";

// STYLES
import styles from "./CourseScreen.module.css";

// TYPES
import { CourseResponse, Module, Modal } from "../types/CourseTypes";

const CourseScreen = () => {
  let userEmail = "";
  const { user } = useAuth();
  if (user) userEmail = user.email;
  const location = useLocation();
  const [watched, setWatched] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [modalModule, setModule] = useState<Module>();
  const [course, setCourse] = useState<CourseResponse>();
  const [lessonsQnt, setLessonsQnt] = useState(0);
  const [trailName, setTrailName] = useState("");
  const [ambassador, setambassador] = useState<boolean>();

  const [classModalIsOpen, setClassModalIsOpen] = useState(false);
  const [moduleModalIsOpen, setModuleModalIsOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleModalType, setModuleModalType] = useState<Modal>("ADD");
  const trailId = location.pathname.split("/")[3];
  const courseId = location.pathname.split("/")[5];

  const getCourse = async () => {
    const response = await api.get(`/course/${courseId}/${userEmail}`);
    setCourse(response.data.course);
    setTrailName(response.data.course.trail.name);
    setambassador(response.data.role === "AMBASSADOR");
    setModules(response.data.modules);
    setWatched(response.data.watched);
    setLessonsQnt(response.data.lessonQnt);
  };

  useEffect(() => {
    if (courseId !== "" && userEmail !== "") {
      getCourse();
    }
  }, [userEmail]);

  useEffect(() => {
    if (ambassador) {
      let qnt = 0;
      modules.map((module) => (qnt += module!.lessons!.length));
      setLessonsQnt(qnt);
    }
  }, [modules]);

  const getLevel = (level: string) => {
    if (level === "HIGH") return "Avançado";
    if (level === "MEDIUM") return "Intermediário";
    return "Iniciante";
  };

  const setAddModuleModal = () => {
    setModule(undefined);
    setModuleModalType("ADD");
    setModuleModalIsOpen(true);
    setModuleName("");
  };

  if (
    !user ||
    course === undefined ||
    userEmail === "" ||
    ambassador === undefined
  ) {
    return <div>Loading...</div>;
  }
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
            {ambassador && (
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
              onClose={() => (setClassModalIsOpen(false), getCourse())}
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
              reRender={() => getCourse()}
            />
          )}
          {modules.length > 0 ? (
            <div className={styles.modules}>
              <>
                {modules.map((module, index) =>
                  module.blocked ? (
                    <Tooltip
                      content={
                        ambassador
                          ? "Atualize a página para editar este módulo"
                          : "Módulo bloqueado! Para destravá-lo e ter acesso a este conteúdo, conclua o módulo anterior."
                      }
                      direction={ambassador ? "top" : "bottom-right"}
                      key={"tooltip" + index}
                    >
                      <Accordion
                        key={module.id}
                        ambassador={ambassador}
                        width={848}
                        position={index + 1}
                        blocked={module.blocked}
                        completed={module.completed}
                        // completed={isCompleted(module.id)}
                        watched={watched}
                        module={module}
                        setModule={setModule}
                        openModuleModal={setModuleModalIsOpen}
                        setModuleModalType={setModuleModalType}
                        setModuleName={setModuleName}
                        reRender={() => getCourse()}
                      />
                    </Tooltip>
                  ) : (
                    <Accordion
                      key={module.id}
                      ambassador={ambassador}
                      width={848}
                      position={index + 1}
                      blocked={module.blocked}
                      completed={module.completed}
                      watched={watched}
                      module={module}
                      setModule={setModule}
                      openModuleModal={setModuleModalIsOpen}
                      setModuleModalType={setModuleModalType}
                      setModuleName={setModuleName}
                      reRender={() => getCourse()}
                    />
                  )
                )}
              </>
            </div>
          ) : (
            <div className={styles.no_modules}>
              <IconInfo sx={{ fontSize: 60, color: "#EAB308" }} />
              <span>Este curso ainda não possui nenhum módulo.</span>
              {ambassador && (
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
                module: modules.length,
                class: lessonsQnt,
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
