import { useAuth } from "../../context/AuthContext";
import CardInfoCurso from "../course/components/card/CardInfoCurso";
import CardCurso from "../course/components/card/CardInfoCurso";
import Acordeon from "../course/components/acordeon/Acordeon";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <CardInfoCurso />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
