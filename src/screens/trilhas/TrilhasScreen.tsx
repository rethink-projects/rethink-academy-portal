import styles from "./TrilhasScreen.module.css";
import CardTrilhas from "../../components/CardTrilhas/CardTrilhas";

const TrilhasScreen = () => {
  const inputTrilha = {
    totalVideo: 30,
    watched: 30,
  };
  return (
    <div className={styles.trilhas_container}>
      <div className={styles.text_container}>
        <div className={styles.title}>Trilhas</div>
        <div className={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </div>
        <div className={styles.cards_container}>
          <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas>
          <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas>
          <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas>
          <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas>
        </div>
      </div>
    </div>
  );
};

export default TrilhasScreen;
