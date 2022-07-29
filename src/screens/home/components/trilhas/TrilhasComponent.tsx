import styles from "./TrilhasComponent.module.css";
import IconMap from "@mui/icons-material/MapOutlined";
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";

//Componente a ser usado na HOME
const TrilhasComponent = () => {

    const users = [
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
                            completed: false
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
        },
        {
            id: 2,
            name: "Gabriel",
            main: "engenharia",
            watched: [{ "trilha": 3 }]
        }
    ]

    const trilhas = [
        { name: "academy", id: 1, description: "descrição" },
        { name: "design", id: 2, description: "descrição" },
        { name: "engenharia", id: 3, description: "descrição" },
        { name: "produto", id: 4, description: "descrição" }
    ]

    return (
        <div className={styles.trilhas_container}>
            <div className={styles.trilhas_title_container}>
                <div className={styles.icon_container}>
                    <IconMap />
                </div>
                <span>Trilhas</span>
            </div>
            <div className={styles.cards_container}>
                {/* <CardTrilhasHome blocked name={"Academy"} />
                <CardTrilhasHome name={"Produto"} />
                <CardTrilhasHome blocked name={"Design"} />
                <CardTrilhasHome name={"Engenharia"} /> */}

                {trilhas.map((trilha) => (
                    <CardTrilhasHome key={trilha.id} trilha={trilha} />
                ))}
            </div>
        </div>
    );
};

export default TrilhasComponent;
