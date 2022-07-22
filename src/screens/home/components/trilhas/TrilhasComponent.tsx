import styles from "./TrilhasComponent.module.css";
import IconMap from "@mui/icons-material/MapOutlined";
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";

type TrilhasComponentType = {
  name: string;
  dataInput: Object;
};

//Componente a ser usado na HOME
const TrilhasComponent = () => {
  const user = {
    id: 1,
    name: "Nome Do Estagiário Aqui",
    main: "engenharia",
    trilhas: [
      {
        trilha: "engenharia",
        courses: [
          {
            course: "React",
            lastWatched: "Vídeo5",
            watched: ["Video1", "Video2", "Video5"],
          },
          { course: "Typescript", lastWatched: "", watched: [] },
          { course: "Nodejs", lastWatched: "", watched: [] },
        ],
      },
    ],
  };
  
  return (
    <div className={styles.trilhas_container}>
      <div className={styles.trilhas_title_container}>
        <div className={styles.icon_container}>
          <IconMap
          // style={{ width: "16.25px", height: "16.25px" }}
          />
        </div>
        <span>Trilhas</span>
      </div>
      <CardTrilhasHome />
      {/*  />
          </TrilhasComponent> */}
    </div>
  );
};

export default TrilhasComponent;
