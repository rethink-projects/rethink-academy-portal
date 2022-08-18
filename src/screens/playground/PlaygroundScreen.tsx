import React, { useState } from "react";
import styles from "./Playground.module.css";
import ModalTrails from "../../components/ModalTrilhas/ModalTrilhas";
import CloseIcon from "@mui/icons-material/Close";

const PlaygroundScreen = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <div>
      <div className={styles.playground_container}>
        <div className={styles.playground_container_inner}>
          <button onClick={() => setModalIsOpen(true)}>Modal</button>
          {modalIsOpen && (
            <ModalTrails
              iconClose={<CloseIcon />}
              onClose={() => setModalIsOpen(false)}
              title="Tem certeza que deseja excluir?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundScreen;
