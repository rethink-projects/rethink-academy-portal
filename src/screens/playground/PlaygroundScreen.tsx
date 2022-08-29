import EmptyModal from "../../components/EmptyModal/EmptyModal";
import styles from "./Playground.module.css";
import { useState } from "react";

function PlaygroundScreen() {
  const [seeModal, setSeeModal] = useState(false);

  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>

        <button onClick={() => setSeeModal(true)}>Teste</button>
        {seeModal && (
          <EmptyModal onClose={() => setSeeModal(!seeModal)} id={"s"}>
            <div style={{ width: "500px", height: "500px" }}>desasd</div>
          </EmptyModal>
        )}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
