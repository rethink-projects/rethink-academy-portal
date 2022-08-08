import styles from "./TrilhasComponent.module.css";
import IconMap from "@mui/icons-material/MapOutlined";
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";

//Componente a ser usado na HOME
const TrilhasComponent = () => {
  const trilhas = [
    { name: "academy", id: 1, description: "descrição" },
    { name: "design", id: 2, description: "descrição" },
    { name: "engenharia", id: 3, description: "descrição" },
    { name: "produto", id: 4, description: "descrição" },
  ];

  return (
    <div className={styles.trilhas_container}>
      <div className={styles.trilhas_title_container}>
        <div className={styles.icon_container}>
          <IconMap />
        </div>
        <span>Trilhas</span>
      </div>
      <div className={styles.cards_container}>
        {trilhas.map((trilha) => (
          <CardTrilhasHome key={trilha.id} trilha={trilha} />
        ))}
      </div>
    </div>
  );
};

export default TrilhasComponent;
