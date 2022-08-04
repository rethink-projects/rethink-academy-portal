import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./CourseScreen.module.css";
import Acordeon from "./components/acordeon/Acordeon";
import CardInfoCurso from "./components/card/CardInfoCurso";

const CourseScreen = () => {
    const location = useLocation();

    const courses = [
        {
            id: 1,
            name: "Nothink",
            trilha: 3,
            "lastCourse": 4,
            "completed": false,
            "description": "descrição"
        }];

    const classes = [
        {
            id: "iax9dhaiudshasip1",
            name: "class_01",
            url: "nothink-video-01.com",
            trilha: 3,
            courses: 1,
            order: 1,
            description: "descrição",
            module: 1
        },
        {
            id: "iax9dhaiudshasip2",
            name: "class_02",
            url: "nothink-video-02.com",
            trilha: 3,
            courses: 1,
            order: 2,
            description: "descrição",
            module: 1

        },
        {
            id: "iax9dhaiudshasip3",
            name: "class_02",
            url: "nodeJS-video-01.com",
            trilha: 3,
            courses: 2,
            order: 1,
            description: "descrição",
            module: 2
        }]



    const getClassesByCourse = (idCourse: number) => {
        // retornar array de todas as aulas de um determinado curso
    }


    const filterClassesByModule = (idModule: number) => {
        // retornar array de todas as aulas de um determinado modulo
    }


    const getBreadcrumbs = () => {
        const url = location.pathname;
        let path = url.split("/curso");
        const linkHome = { title: "Home", link: "/" };
        const linkTrilhas = { title: "Trilhas", link: "/trilhas" };
        const linkCourses = { title: "Cursos", link: path[0] };
        const linkCourse = { title: "Curso 1", link: url };
        return [linkHome, linkTrilhas, linkCourses, linkCourse];
    }

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <div className={styles.content_course}>
                    <Breadcrumb breadcrumbItems={getBreadcrumbs()} />
                    <h1 className={styles.title}>UX Design</h1>
                    <h2 className={styles.about}>Sobre o Curso:</h2>
                    <p className={styles.description}>
                        Aprenda a executar pesquisas de UX Design, fazer testes de usabilidade
                        e elaborar análises, além de utilizar frameworks e métodos para a
                        criação de designs de qualidade e que ofereçam uma boa experiência ao
                        usuário. Ao concluir as aulas, você estará pronto para definir
                        processos e construir frameworks baseados em estudos sobre as
                        necessidades dos usuários, seus objetivos, habilidades e limitações,
                        para alcançar os objetivos de negócios.
                    </p>

                    <div className={styles.modules}>
                        <h2 className={styles.title_modules}>Lista de Conteúdos:</h2>
                        <Acordeon width={848} />
                    </div>
                </div>
                <div className={styles.practical_information}>
                    <div className={styles.card_info}>
                        <CardInfoCurso />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CourseScreen