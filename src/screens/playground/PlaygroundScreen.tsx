import React from "react";
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
        <SocialButton type='secundary' onClick={() => console.log("clicou")} />
        <SocialButton onClick={() => console.log("clicou")} />
        <ButtonLeft
          size='small'
          icon='LightBulb'
          text='Fazer login'
          onClick={() => {}}
        />
      </div>
      <div className={styles.sub_content}>
        <Spinner size='big' type='light' isLoading={true} />
        <Spinner size='small' type='light' isLoading={true} />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
