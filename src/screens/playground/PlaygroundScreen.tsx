import { useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const [value, setValue] = useState("");
  const options = ["opção1", "opção 2"];

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <Dropdown
          key={"s"}
          options={options}
          setValue={setValue}
          value={value}
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
