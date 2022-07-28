import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CursosScreen.module.css";

const CursosScreen = () => {
  const location = useLocation();
  let trilhaId = location.pathname.replace("/trilhas/", "");

  // Na falta dos dados vamos tratar de forma mecanica
  const trilha =
    trilhaId == "1"
      ? "Academy"
      : trilhaId == "2"
      ? "Design"
      : trilhaId == "3"
      ? "Engenharia"
      : "Produto";

  // Identificando se o menu está ativo ou não
  const activeMenu = false;

  return (
    <div className={styles.center}>
      <div className={styles.container_cursos}>
        <div className={styles.route}>
          <p>
            Home {">"} Trilhas {">"} Cursos
          </p>
        </div>
        <div className={styles.title}>
          <p>{`Programa de Cursos | ${trilha}`}</p>
        </div>
        <div className={styles.cards}>
          <div className={styles.curso}>blabla biruleibe</div>
          <div className={styles.curso}>blabla biruleibe leibe</div>
        </div>
      </div>
    </div>
  );
};

export default CursosScreen;
