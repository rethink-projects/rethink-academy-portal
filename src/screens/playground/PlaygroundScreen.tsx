import { useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const [value, setValue] = useState("");
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <Dropdown
          options={["asd", "as"]}
          id={"wd"}
          setValue={setValue}
          value={value}
          width={190}
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
