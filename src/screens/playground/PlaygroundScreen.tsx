import styles from "./Playground.module.css";

import React, { useState } from "react";

import EmblemCard from "../../components/EmblemCard/EmblemCard";
import SimpleButton from "../../components/SimpleButton/SimpleButton";
import Modal from "../../components/Modal/Modal";

function PlaygroundScreen() {
  const [emblemCardOpen, setEmblemCardOpen] = useState(false);

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
      </div>
      <div className={styles.playground_container_inner}>
        <SimpleButton
          onClick={() => setEmblemCardOpen(true)}
          type="outline"
          text="Ganhar Emblema =D"
          size="medium"
        ></SimpleButton>
        {emblemCardOpen && (
          <EmblemCard
            content="Você concluiu um curso da Trilha Design e merece um emblema!"
            badge="Academy"
            onClickCollect={() => setEmblemCardOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
