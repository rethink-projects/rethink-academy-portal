import styles from "./CardTrilhasHome.module.css";
import IconPadlock from "@mui/icons-material/LockOutlined";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";

type CardTrilhasHome = {
    trilha: {
        name: string,
        id: number,
        description: string
    };
};

type TypeTrilhaUser = {
    trilha: number,
    courses:
    {
        course_id: number,
        lastWatched_class_id: string,
        watched: string[],
        completed: boolean
    }[]

}

//Componente do componente trilhas da HOME
const CardTrilhasHome = ({ trilha }: CardTrilhasHome) => {
    const videoAmount = 100;
    const totalWatched = 66;

    const user =
    {
        id: 1,
        name: "Fernando",
        main: "engenharia",
        trilhas: [
            {
                trilha: 3,
                courses: [
                    {
                        course_id: 1,
                        lastWatched_class_id: "iax9dhaiudshasip1",
                        watched: ["iax9dhaiudshasip1", "iax9dhaiudshasip1"],
                        completed: true
                    },
                    {
                        course_id: 2,
                        lastWatched_class_id: "iax9dhaiudshasip1",
                        watched: [],
                        completed: false
                    }
                ]
            }
        ]
    }

    const courses = [
        {
            id: 1,
            name: "Nothink",
            trilha: 3,
            lastCourse: 4,
            completed: true
        },
        {
            id: 2,
            name: "NodeJS",
            trilha: 3,
            lastCourse: 24,
            completed: true
        }
    ]

    const findTrilhaUser = (idTrilha: number) => {
        return user.trilhas.find((trilhaUser) => trilhaUser.trilha === idTrilha);
    }


    const filterCoursesByTrilha = () => {
        return courses.filter((course) => course.trilha === trilha.id && course.completed === true);
    }

    const filterCoursesUserByCompleted = (trilhaUser: TypeTrilhaUser) => {
        return trilhaUser.courses.filter(courseUser => courseUser.completed === true);
    }

    const findCoursesCompletedByTrilhaUser = () => {
        const getTrilhaUser = findTrilhaUser(trilha.id);
        if (getTrilhaUser) {
            // return getTrilhaUser.courses.filter(courseUser => courseUser.completed === true);
            return filterCoursesUserByCompleted(getTrilhaUser);
        }
        else {
            return [];
        }
    }

    const verifyTrilhaCompleted = () => {
        const totalCursos = filterCoursesByTrilha();
        const getTrilha = findTrilhaUser(trilha.id);
        if (getTrilha) {
            // const cursosCompletados = getTrilha.courses.filter(course => course.completed === true);
            const cursosCompletados = filterCoursesUserByCompleted(getTrilha);
            return totalCursos.length === cursosCompletados.length && totalCursos.length > 0;
        } else {
            return false;
        }
    }

    const verifyExistCourseCompleted = (idTrilha: number) => {
        const trilhaUser = findTrilhaUser(idTrilha)
        if (!trilhaUser) {
            return false;
        }
        const cursoCompleto = trilhaUser.courses.find((course) => course.completed === true);
        return cursoCompleto ? true : false;
    }

    const unlockTrilha = (nameTrilha: string) => {
        if (nameTrilha === "design") {
            return verifyExistCourseCompleted(4);
        }
        else if (nameTrilha === "engenharia") {
            return verifyExistCourseCompleted(2);
        }
        else {
            return verifyExistCourseCompleted(3);
        }
    }


    const checkWhichTrilhaUnlock = (): boolean => {
        if (trilha.name === user.main) {
            return true;
        }
        else if (trilha.name === "academy") {
            return true;
        }
        else if (trilha.name === "design") {
            return unlockTrilha("design");
        }
        else if (trilha.name === "engenharia") {
            return unlockTrilha("engenharia");
        }
        else {
            return unlockTrilha("produto");
        }

    }

    const calculoPorcentagem = () => {
        if (filterCoursesByTrilha().length > 0) {
            return Math.floor((findCoursesCompletedByTrilhaUser().length * 100) / filterCoursesByTrilha().length);
        }
        else {
            return 0;
        }
    }

    const containerClass = verifyTrilhaCompleted() ? styles.container_completed : styles.container;

    return (
        <div className={containerClass}>
            <span className={styles.name_trilha}>{trilha.name}</span>
            <div className={styles.divisoria}></div>
            <div className={styles.state}>
                {checkWhichTrilhaUnlock() ? (
                    <div className={styles.free}>
                        <span>{calculoPorcentagem()}%</span>
                        <ProgressBar
                            totalValue={filterCoursesByTrilha().length}
                            relativeValue={findCoursesCompletedByTrilhaUser().length}
                            size="small"
                            width={110}
                        />
                    </div>
                ) : (
                    <div className={styles.blocked}>
                        <div className={styles.padlock_border}>
                            <IconPadlock />
                        </div>
                        <span>Bloqueada!</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardTrilhasHome;


