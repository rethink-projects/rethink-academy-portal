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
          id={"ss"}
          options={options}
          setValue={setValue}
          size={"micro"}
        />
        <Dropdown
          id={"s"}
          options={options}
          setValue={setValue}
          size={"small"}
        />
        <Dropdown
          id={"sss"}
          options={options}
          setValue={setValue}
        />
        <Dropdown
          id={"ssss"}
          options={options}
          setValue={setValue}
          size={"large"}
        />
        <Dropdown
          id={"ssss"}
          options={options}
          setValue={setValue}
          size={"large"}
          disabled
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
