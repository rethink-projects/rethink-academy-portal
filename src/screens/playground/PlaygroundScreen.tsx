import React, { useState } from "react";
import ModalTrilhas from "../../components/TrailModal/TrailModal";
import styles from "./Playground.module.css";
import CloseIcon from "@mui/icons-material/Close";

function PlaygroundScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <button onClick={() => setModalIsOpen(true)}>Modal</button>
        {modalIsOpen && (
          <ModalTrilhas
            onClose={() => setModalIsOpen(false)}
            title="Tem certeza que deseja excluir?"
          />
        )}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
