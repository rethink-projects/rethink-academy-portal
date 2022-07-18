import React from "react";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./Playground.module.css";
import Radio from "../../components/Radio/Radio";
import Label from "../../components/Label/Label";
import IconInfo from "@mui/icons-material/InfoOutlined";

function PlaygroundScreen() {
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      {/* <div className={styles.sub_content}>
        <span>Componente Checkbox</span>
        <Checkbox name="Teste" />
        <Checkbox name="Não se atreva a me marcar" disabled />
        <Checkbox name="Marque para ser feliz" disabled checked />
      </div> */}

      <div className={styles.sub_content}>
        <span>Componente Label</span>
        <Label color="primary" size="large" iconPosition="both" text="label">
          <IconInfo />
        </Label>
        {/* <Label
          color="secondary"
          size="large"
          iconPosition="right"
          text="label"
          icon="info"
        />
        <Label
          color="accent"
          size="large"
          iconPosition="none"
          text="label"
          icon="info"
        />
        <Label
          color="danger"
          size="default"
          iconPosition="both"
          text="label"
          icon="info"
        />
        <Label
          color="warning"
          size="small"
          iconPosition="both"
          text="label"
          icon="info"
        />
        <Label
          color="success"
          size="micro"
          iconPosition="both"
          text="label"
          icon="info"
        /> */}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
