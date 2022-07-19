import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./Playground.module.css";
import Radio from "../../components/Radio/Radio";
import Modal from "../../components/Modal/Modal";

function PlaygroundScreen() {
  const [isModalOpen, setModalOpen] = useState(false);


  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Checkbox</span>
        <Checkbox name="Teste" />
        <Checkbox name="Não se atreva a me marcar" disabled />
        <Checkbox name="Marque para ser feliz" disabled checked />
      </div>
      <div className={styles.sub_content}>
        <span>Modal</span>
        <button onClick={() => setModalOpen(true) } >Open Modal </button>
        {isModalOpen && 
          <Modal isModalOpen={isModalOpen} title="Title" description="If you think it's a modal dialog, please hit the confirm button to let us know!" onClose={() => setModalOpen(false) } nameCheckbox="Don't show again"  >
            slot
          </Modal>}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
