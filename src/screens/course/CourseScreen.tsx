import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./CourseScreen.module.css";
import Acordeon from "../../components/Acordeon/Acordeon";
import CardInfoCurso from "./components/card/CardInfoCurso";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import IconEdit from "@mui/icons-material/EditOutlined";
import IconFolder from "@mui/icons-material/CreateNewFolderOutlined";

const CourseScreen = () => {
  const location = useLocation();

  const courses = [
    {
      id: 1,
      name: "Nothink",
      trilha: 3,
      lastCourse: 4,
      completed: false,
      description: "descrição",
    },
  ];

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

  const getClassesByCourse = (idCourse: number) => {
    // retornar array de todas as aulas de um determinado curso
  };

  const filterClassesByModule = (idModule: number) => {
    // retornar array de todas as aulas de um determinado modulo
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
            <div className={styles.header_right}>
              <ButtonWithIcon
                icon={<IconEdit />}
                text={"Editar curso"}
                position={"right"}
                size={"medium"}
                type={"secondary"}
                width={218}
              />
              <ButtonWithIcon
                icon={<IconEdit />}
                text={"Adicionar módulo"}
                position={"right"}
                size={"medium"}
                type={"primary"}
                width={218}
              />
            </div>
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

          <div className={styles.no_modules}>
            <IconFolder
              sx={{ fontSize: 80, color: "var(--color-tertiary-hover)" }}
            />
            <span>Você ainda não possui nenhum módulo.</span>
            <ButtonWithIcon
              icon={<IconEdit />}
              text={"Adicionar módulo"}
              position={"right"}
              size={"medium"}
              type={"primary"}
              width={218}
            />
          </div>
          <div className={styles.modules}>
            {/* <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} />
            <Acordeon width={848} /> */}
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
