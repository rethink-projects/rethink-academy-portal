import React from "react";
import Button from "../../components/Button/Button";
import styles from "./Playground.module.css";

// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>insira abaixo o seu componente:</p>
      </div>
      <div>
        <SimpleButton type="secondary" size="big" text="Simple Button" onClick={() => {}} /> 
      </div>
    </div>
  );
}

export default PlaygroundScreen;
