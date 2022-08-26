import { useEffect, useState } from "react";
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
  moduleId: number;
};

const CourseScreen = () => {
  const location = useLocation();

  const trailId = location.pathname.split("/")[2];
  const courseId = location.pathname.split("/")[4];
  const userEmail = "lucas.paula@rethink.dev";

  const [modules, setModules] = useState<TypeModule[]>([]);
  const [courses, setCourses] = useState<TypeCourse[]>([]);
  const [watcheds, setWatcheds] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5432/api/course/" + courseId)
      .then((response) => {
        if (response.data.modules) {
          setModules(response.data.Modules);
        }
      });

    axios.get("http://localhost:4000/api/trail").then((response) => {
      if (response.data.trail) {
        setCourses(response.data.courses);
      }
    });
    axios
      .get("http://localhost:5432/api/user/watched/list/" + userEmail)
      .then((response) => {
        if (response.data.user.watched) {
          setWatcheds(response.data.user.watched);
        }
      });
  }, []);

  // const course = {
  //   id: "1",
  //   name: "Nothink",
  //   trilha: 3,
  //   lastCourse: 4,
  //   completed: false,
  //   description: "descrição",
  //   modules: [
  //     // { nome: "oi" }
  //   ],
  // };

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
  const verifyBlock = async (moduleId: string) => {
    let i = 1;
    let anteriorModule: TypeModule;
    //se o módulo for o primeiro
    if (moduleId === modules[0].id) {
      return false;
    }
    //se o módulo anterior tiver sido concluído
    else{
      // anteriorModule = modules[0];
      while (modules[i].id !== moduleId) {
        anteriorModule = modules[i];
        i++;
      };
      if(anteriorModule.lessons.forEach((lesson)=>(lesson.id))
    }
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
  // const [classModalIsOpen, setClassModalIsOpen] = useState(false);
  const [moduleModalIsOpen, setModuleModalIsOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleModalType, setModuleModalType] = useState<"add" | "edit">("add");
  const embassador = true;

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
                  onClick={() => (
                    setModuleModalType("add"),
                    setModuleModalIsOpen(true),
                    setModuleName("")
                  )}
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

          {modules == null && (
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

          {moduleModalIsOpen && (
            <ModuleModal
              onClose={() => setModuleModalIsOpen(false)}
              type={moduleModalType}
              moduleName={moduleName}
              setModuleName={setModuleName}
            />
          )}
          <div className={styles.modules}>
            <>
              {modules?.map((module) => (
                <Acordeon
                  width={848}
                  openModuleModal={setModuleModalIsOpen}
                  setModuleModalType={setModuleModalType}
                  setModuleName={setModuleName}
                  embassador={embassador}
                  moduleId={module.id}
                />
              ))}
            </>
          </div>
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
