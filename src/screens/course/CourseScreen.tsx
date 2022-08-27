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

type TypeCourse = {
  id: string;
  name: string;
  description: string;
  level: string;
  workload: number;
  learning: string;
  skills: string;
  trailId: string;
  teacherId: string;
};
type TypeModule = {
  id: string;
  name: string;
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

const CourseScreen = () => {
  const location = useLocation();
  const [watcheds, setWatcheds] = useState<string[]>([]);
  const [modules, setModules] = useState<TypeModule[]>([]);
  const [modalModule, setModule] = useState<TypeModule>();
  const [course, setCourse] = useState<TypeCourse[]>([]);
  const [embassador, setEmbassador] = useState<boolean>();

  // const [classModalIsOpen, setClassModalIsOpen] = useState(false);
  const [moduleModalIsOpen, setModuleModalIsOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleModalType, setModuleModalType] = useState<
    "add" | "edit" | "delete"
  >("add");
  let userEmail = "";
  const { user } = useAuth();
  if (user) userEmail = user.email;

  const trailId = location.pathname.split("/")[2];
  const courseId = location.pathname.split("/")[4];
  useEffect(() => {
    axios
      .get("http://localhost:5432/api/user/" + userEmail)
      .then((response) => {
        if (response.data.user) {
          console.log(response.data.user.role);
          setEmbassador(response.data.user.role === "STUDENT");
        }
      });
    axios
      .get("http://localhost:5432/api/course/" + courseId)
      .then((response) => {
        if (response.data.course) {
          setCourse(response.data.course);
        }
      });

    axios
      .get("http://localhost:5432/api/course/" + courseId + "/modules")
      .then((response) => {
        if (response.data.modules) {
          setModules(response.data.modules);
        }
      });

    axios
      .get("http://localhost:5432/api/user/watched/list/" + userEmail)
      .then((response) => {
        if (response.data.watched) {
          setWatcheds(response.data.watched);
        }
      });
    console.log("guardei tudo");
  }, [userEmail]);

  console.log("rodou aqui");
  if (!user || course === [] || userEmail === "" || embassador === undefined) {
    return <div>Loading...</div>;
  }
  const isBlocked = (moduleId: string) => {
    if (embassador) return false;
    let i = 1;
    //se o módulo for o primeiro
    if (moduleId === modules[0].id) {
      return false;
    }
    //se o módulo anterior tiver sido concluído
    else {
      let anteriorModule: TypeModule = modules[0];

      while (modules[i].id !== moduleId) {
        anteriorModule = modules[i];
        i++;
      }

      isCompleted(anteriorModule.id);
    }
  };
  const isCompleted = (moduleId: string) => {
    if (embassador) return true;
    let module: TypeModule = modules[0];
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
        return false;
      }
    });

    return true;
  };

  const getBreadcrumbs = () => {
    const url = location.pathname;
    let path = url.split("/curso");
    const linkHome = { title: "Home", link: "/" };
    const linkTrilhas = { title: "Trilhas", link: "/trilhas" };
    const linkCourses = { title: "Cursos", link: path[0] };
    const linkCourse = { title: "Curso 1", link: url };
    return [linkHome, linkTrilhas, linkCourses, linkCourse];
  };
  const confirmModulesChanges = () => {};

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
          <Breadcrumb breadcrumbItems={getBreadcrumbs()} />
          {/* <h1 className={styles.title}>UX Design</h1>
              <h2 className={styles.about}>Sobre o Curso:</h2> */}
          <div className={styles.header}>
            <div className={styles.header_left}>
              <h1 className={styles.title}>UX Design</h1>
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
                  // onClick={() => setClassModalIsOpen(true)}
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
          <p className={styles.description}>
            Aprenda a executar pesquisas de UX Design, fazer testes de
            usabilidade e elaborar análises, além de utilizar frameworks e
            métodos para a criação de designs de qualidade e que ofereçam uma
            boa experiência ao usuário. Ao concluir as aulas, você estará pronto
            para definir processos e construir frameworks baseados em estudos
            sobre as necessidades dos usuários, seus objetivos, habilidades e
            limitações, para alcançar os objetivos de negócios.
          </p>

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
                  position={index+1}
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
              <span>Você ainda não possui nenhum módulo.</span>
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
              author="Fernando Henrique"
              authorDescription="Meu nome é Fernando Henrique. Tenho 21 anos de idade e sou desenvolverdor na Rethink Tecnologia"
              level="Iniciante"
              learn={["react"]}
              module_class={{ module: 1, class: 1 }}
              skills={["react"]}
              avatar={
                "https://lh3.googleusercontent.com/ogw/AOh-ky1Wi2_jWlZYQbYRe3xWHdnt2u9dYA2jPp9BYsij=s32-c-mo"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseScreen;
