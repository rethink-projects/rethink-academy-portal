import Note from "../../components/Note/Note";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <Note />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
