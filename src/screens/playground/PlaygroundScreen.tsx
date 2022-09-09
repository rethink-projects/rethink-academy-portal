import Comment from "../../components/Comment/Comment";
import RegisterScreen from "../RegisterScreen/RegisterScreen";
import TaskAnalysisScreen from "../RegisterScreen/TaskAnalysisScreen/TaskAnalysisScreen";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <TaskAnalysisScreen />
        {/* <Comment /> */}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
