import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const [onClose, setOnClose] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  useEffect(() => {
    if (onClose === true) {
      const timer = setTimeout(() => {
        setTimeOut(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <button onClick={() => setOnClose(true)}>Gabriel</button>
        {timeOut ? (onClose ? `onClose${onClose}` : "teste") : "calma"}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
