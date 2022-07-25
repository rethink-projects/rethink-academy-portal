import styles from "./TrilhasComponent.module.css";
import IconMap from "@mui/icons-material/MapOutlined";
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";

//Componente a ser usado na HOME
const TrilhasComponent = () => {
  return (
    <div className={styles.trilhas_container}>
      <div className={styles.trilhas_title_container}>
        <div className={styles.icon_container}>
          <IconMap />
        </div>
        <span>Trilhas</span>
      </div>
      <div className={styles.cards_container}>
        <CardTrilhasHome blocked name={"Academy"} />
        <CardTrilhasHome name={"Produto"} />
        <CardTrilhasHome blocked name={"Design"} />
        <CardTrilhasHome name={"Engenharia"} />
      </div>
    </div>
  );
};

export default TrilhasComponent;
