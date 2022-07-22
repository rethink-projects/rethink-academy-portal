import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
        <div className={styles.main_content}>
          <h2>Playground de Componentes</h2>
          <p>Insira abaixo o seu componente:</p>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
