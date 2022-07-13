import React from "react";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import ButtonWithIconRight from "../../components/ButtonWithIconRight/ButtonWithIconRight";
import SocialButton from "../../components/SocialButton/SocialButton";
import Spinner from "../../components/Spinner/Spinner";
import ButtonLeft from "../../components/ButtonLeft/ButtonLeft";

import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}>
        <SocialButton type="secundary" onClick={() => console.log("clicou")} />
        <SocialButton onClick={() => console.log("clicou")} />
        <ButtonLeft
          size="small"
          icon="LightBulb"
          text="Fazer login"
          onClick={() => {}}
        />
      </div>
      <div className={styles.sub_content}>
        <Spinner size="big" type="light" isLoading={true} />
        <Spinner size="small" type="light" isLoading={true} />
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
      <div className={styles.sub_content}>
        <span>Componente Textarea</span>
        <div className={styles.sub_content_textarea}>
          <Textarea placeholder="Place Holder" label="Large" caption="Element caption" type="large" />
          <Textarea placeholder="Place Holder" label="Default Disabled" caption="Element caption" disabled />
          <Textarea placeholder="Place Holder" label="Small" caption="Element caption" type="small" />
        </div>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
