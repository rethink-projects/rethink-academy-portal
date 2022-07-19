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
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
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
