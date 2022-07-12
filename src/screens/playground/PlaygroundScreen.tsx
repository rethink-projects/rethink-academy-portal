import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Button</span>
        <Button />
      </div>
      <div className={styles.sub_content}>
        <span>Componente Spinner</span>
        <Spinner isLoading type="light" size="small" />
        <Spinner isLoading type="light" size="big" />
        <Spinner isLoading type="dark" size="small"/>
        <Spinner isLoading type="dark" size="big" />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
