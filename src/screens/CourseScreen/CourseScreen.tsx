import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./CourseScreen.module.css";

const CourseScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.content_course}>
                    <Breadcrumb breadcrumbItems={[{ title: "Course", link: "#" }]} />
                    <h1 className={styles.title}>title</h1>
                    <h2 className={styles.about}>Sobre o Curso:</h2>
                    <p className={styles.description}>
                        Aprenda a executar pesquisas de UX Design, fazer testes de usabilidade e elaborar análises, além de utilizar frameworks e métodos para a criação de designs de qualidade e que ofereçam uma boa experiência ao usuário. Ao concluir as aulas, você estará pronto para definir processos e construir frameworks baseados em estudos sobre as necessidades dos usuários, seus objetivos, habilidades e limitações, para alcançar os objetivos de negócios.
                    </p>

                    <div className={styles.modules}>
                        <h2 className={styles.title_modules}>Lista de Conteúdos:</h2>
                    </div>
                </div>
                <div className={styles.practical_information}>

                </div>
            </div>
        </div>
    )
}

export default CourseScreen