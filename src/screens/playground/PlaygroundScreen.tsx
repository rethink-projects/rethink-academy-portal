// CSS
import styles from "./Playground.module.css";

// Button Icon Left
import ButtonLeft from "../../components/ButtonLeft/ButtonLeft";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>insira abaixo o seu componente:</p>
      </div>
      {/* <div className={styles.sub_content}>
        <span>Componente Button</span>
        <Button />
      </div> */}
      <div>
        <ButtonLeft
          type="primary"
          size="large"
          iconPosition="left"
          text="Button Label"
          icon="LightBulb"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
