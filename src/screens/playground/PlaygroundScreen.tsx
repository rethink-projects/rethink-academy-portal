import React from "react";
import Button from "../../components/Button/Button";
import ButtonLeft from "../../components/ButtonLeft/ButtonLeft";
import InputSearch from "../../components/InputSearch/InputSearch";
import IconButton from "../../components/IconButton/IconButton";
import Textarea from "../../components/Textarea/Textarea";
import ButtonWithIconRight from "../../components/ButtonWithIconRight/ButtonWithIconRight";
import SocialButton from "../../components/SocialButton/SocialButton";
import Spinner from "../../components/Spinner/Spinner";
import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./Playground.module.css";
import Label from "../../components/Label/Label";
import IconInfo from "@mui/icons-material/InfoOutlined";

// Simple Button
import SimpleButton from "../../components/SimpleButton/SimpleButton";

function PlaygroundScreen() {

  const onChange = (value: string): string => {
    return value;
  }

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div>
        <SimpleButton
          type="secondary"
          size="big"
          text="Simple Button"
          onClick={() => { }}
        />
      </div>
      <div className={styles.sub_content}>
        <SocialButton type='secundary' onClick={() => console.log("clicou")} />
        <SocialButton onClick={() => console.log("clicou")} />
        <ButtonLeft
          size='small'
          icon='LightBulb'
          text='Fazer login'
          onClick={() => { }}
        />
        <span>Componente IconButton</span>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Textarea</span>
        <div className={styles.sub_content_textarea}>
          <Textarea placeholder="Place Holder" label="Large" caption="Element caption" type="large" />
          <Textarea placeholder="Place Holder" label="Default Disabled" caption="Element caption" disabled />
          <Textarea placeholder="Place Holder" label="Small" caption="Element caption" type="small" />
        </div>
        <span>Componente Checkbox</span>
        <Checkbox name="Teste" />
        <Checkbox name="Não se atreva a me marcar" disabled />
        <Checkbox name="Marque para ser feliz" disabled checked />
        <span>Componente Label</span>
        <Label color="primary" size="large" iconPosition="both" text="label">
          <IconInfo />
        </Label>
        <Label color="secondary" size="large" iconPosition="right" text="label">
          <IconInfo />
        </Label>
        <Label color="accent" size="large" iconPosition="none" text="label">
          <IconInfo />
        </Label>
        <Label color="danger" size="default" iconPosition="left" text="label">
          <IconInfo />
        </Label>
        <Label color="warning" size="small" iconPosition="right" text="label">
          <IconInfo />
        </Label>
        <Label color="success" size="micro" iconPosition="left" text="label">
          <IconInfo />
        </Label>
      </div>

      <div className={styles.sub_content}>
        <span>Componente Input Search</span>
        <InputSearch type="micro" label="Element label" caption="Element caption" hasIcon onChange={onChange}></InputSearch>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
