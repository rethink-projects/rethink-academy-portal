import styles from "./Playground.module.css";
import Label from "../../components/Label/Label";
import IconInfo from "@mui/icons-material/InfoOutlined";
import image from "../../assets/academyCardTrilhas.png";


// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import CardTrilhas from "../../components/CardTrilhas/CardTrilhas";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>

      <div className={styles.playground_container_inner}>
        <div>Manter essa tela Limpa, após criar o componente</div>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
