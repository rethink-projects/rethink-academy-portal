import React from "react";
import Button from "../../components/Button/Button";
import InputSearch from "../../components/InputSearch";
import styles from "./Playground.module.css";

function PlaygroundScreen() {

  const onChange = (value: string): string => {
    return value;
  }

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Button</span>
        <Button />
      </div>

      <div className={styles.sub_content}>
        <span>Componente Input Search</span>
        <InputSearch hasIcon caption="Busque por um curso" onChange={onChange} placeholder="teste" label="teste" type="micro"></InputSearch>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
