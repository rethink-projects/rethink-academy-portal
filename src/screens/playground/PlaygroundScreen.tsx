import React from "react";
import styles from "./Playground.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
      </div>
      <div>
        <h3>Breadcrumb</h3>
        <Breadcrumb
          pathNames={["Home", "Dashboard", "Horários", "Marcação de horas"]}
          pathLinks={["home", "dashboard", "horarios", "marcacaodehoras"]}
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
