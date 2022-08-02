import Acordeon from "../course/components/acordeon/Acordeon";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <Acordeon width={0} />
        <Acordeon width={0} />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
