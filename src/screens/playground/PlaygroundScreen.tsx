import LastGoalsCard from "../../components/LastGoalsCard/LastGoalsCard";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <LastGoalsCard mounth="março" quantityGoals={7} quantityGoalsCompleted={1} />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
