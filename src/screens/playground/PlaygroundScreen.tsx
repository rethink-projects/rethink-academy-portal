import React from "react";
import Button from "../../components/Button/Button";
import ButtonWithIconRight from "../../components/ButtonWithIconRight/ButtonWithIconRight";
import SocialButton from "../../components/SocialButton/SocialButton";
import Spinner from "../../components/Spinner/Spinner";
import ButtonLeft from "../../components/ButtonLeft/ButtonLeft";

import AcUnitIcon from "@mui/icons-material/AcUnit";

import styles from "./Playground.module.css";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div className={styles.sub_content}></div>
    </div>
  );
}

export default PlaygroundScreen;
