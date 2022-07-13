import React from "react";
import Button from "../../components/Button/Button";
import ButtonWithIconRight from "../../components/ButtonWithIconRight/ButtonWithIconRight";
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
        <span>Componente Button w/ Icon Right</span>
        <ButtonWithIconRight
          type="primary"
          size="large"
          text="Button label"
          icon="arrow"
        />
        <ButtonWithIconRight
          type="secondary"
          size="medium"
          text="Button label"
          icon="arrow"
        />
        <ButtonWithIconRight
          type="outline"
          size="medium"
          text="Button label"
          icon="arrow"
        />
        <ButtonWithIconRight
          type="disabled"
          size="small"
          text="Button label"
          icon="arrow"
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
