import Textarea from "../../components/Textarea/Textarea";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <Textarea placeholder={"teste"} />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
