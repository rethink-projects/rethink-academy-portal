import React from "react";
import styles from "./Playground.module.css";
import Label from "../../components/Label/Label";
import IconInfo from "@mui/icons-material/InfoOutlined";

// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import CardTrilhas from "../../components/CardTrilhas/CardTrilhas";
import TrilhasComponent from "../home/components/trilhas/TrilhasComponent";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
        <div className={styles.sub_content}>
          <TrilhasComponent />
          <div className={styles.playground_container_inner}>
            <h1>Manter essa tela Limpa, após criar o componente</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
