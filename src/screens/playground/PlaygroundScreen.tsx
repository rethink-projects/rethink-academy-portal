import { useState } from "react";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const [value, setValue] = useState("");
  const options = ["opção1", "opção 2"];

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
