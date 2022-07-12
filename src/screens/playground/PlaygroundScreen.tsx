import React from "react";
import Button from "../../components/Button/Button";
import DropDown from "../../components/Dropdown/Dropdown";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <span>Componente DropDown</span>
        <DropDown />
      </div>
      <div className={styles.sub_content}>
        <span>Componente Button</span>
        <Button />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
