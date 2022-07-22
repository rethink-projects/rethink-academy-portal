import styles from "./Playground.module.css";
import Label from "../../components/Label/Label";
import IconInfo from "@mui/icons-material/InfoOutlined";

// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import CardTrilhas from "../../components/CardTrilhas/CardTrilhas";

function PlaygroundScreen() {
  const inputTrilha = {
    totalVideo: 30,
    watched: 30,
  }
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Card Trilhas</span>


        <CardTrilhas inputTrilha={inputTrilha} title="Title" description="Description"></CardTrilhas>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
