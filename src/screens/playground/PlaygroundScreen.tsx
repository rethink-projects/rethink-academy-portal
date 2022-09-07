import styles from "./Playground.module.css";
import axios from "axios";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div id="YOUR_CONTAINER_ID" className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
