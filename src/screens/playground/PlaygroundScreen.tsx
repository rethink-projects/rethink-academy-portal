import React, { useEffect, useState } from "react";
import CardUltimasMetas from "../../components/CardUltimasMetas/CardUltimasMetas";
import Modal from "../../components/Modal/Modal";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const [isModalOpen, setModalOpen] = useState(false);

  
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
