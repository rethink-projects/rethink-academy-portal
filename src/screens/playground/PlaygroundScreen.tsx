import React from "react";
import SocialButton from "../../components/SocialButton/SocialButton";
import Spinner from "../../components/Spinner/Spinner";
import DropDown from "../../components/Dropdown/Dropdown";
import ButtonLeft from "../../components/ButtonLeft/ButtonLeft";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./Playground.module.css";
import Radio from "../../components/Radio/Radio";

// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";

function PlaygroundScreen() {
  const dropdownContent = ["List Item1", "List Item2"];
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div>
        <SimpleButton type="secondary" size="big" text="Simple Button" onClick={() => {}} /> 
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
        <span>Componente DropDown</span>
        <div className={styles.dropdowns}>
          <DropDown chave={1} content={dropdownContent} size="large" />
          <DropDown chave={2} content={dropdownContent} />
          <DropDown chave={3} content={dropdownContent} size="small" />
        </div>
        <div className={styles.dropdowns}>
          <DropDown chave={4} content={dropdownContent} size="micro" />
          <DropDown chave={5} content={dropdownContent} size="micro" disabled />
        </div>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Button</span>
        <Button />
        <Spinner size="big" type="light" isLoading={true} />
        <Spinner size="small" type="light" isLoading={true} />
        <span>Componente Checkbox</span>
        <Checkbox name="Teste" />
        <Checkbox name="Não se atreva a me marcar" disabled />
        <Checkbox name="Marque para ser feliz" disabled checked />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
