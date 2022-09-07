import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}></div>
    </div>
  );
}

export default PlaygroundScreen;
