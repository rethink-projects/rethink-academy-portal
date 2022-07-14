import React from "react";
import Button from "../../components/Button/Button";
import ButtonLeft from "../../components/ButtonLeft/ButtonLeft";
import InputSearch from "../../components/InputSearch";
import IconButton from "../../components/IconButton/IconButton";
import Textarea from "../../components/Textarea/Textarea";
import ButtonWithIconRight from "../../components/ButtonWithIconRight/ButtonWithIconRight";
import SocialButton from "../../components/SocialButton/SocialButton";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Playground.module.css";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

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
        <IconButton size="big" type="primary" onClick={() => { }}>
          <AccessAlarmIcon />
        </IconButton>
        <IconButton size="small" type="primary" onClick={() => { }}>
          <AccessAlarmIcon />
        </IconButton>
        <IconButton size="big" type="secundary" onClick={() => { }}>
          <AccessAlarmIcon />
        </IconButton>
        <IconButton size="small" type="secundary" onClick={() => { }}>
          <AccessAlarmIcon />
        </IconButton>
        <IconButton size="big" type="ghost" onClick={() => { }}>
          <AccessAlarmIcon />
        </IconButton>
        <IconButton size="small" type="ghost" onClick={() => { }}>
          <AccessAlarmIcon />
        </IconButton>
      </div>
      <div className={styles.sub_content}>
        <span>Componente Textarea</span>
        <div className={styles.sub_content_textarea}>
          <Textarea placeholder="Place Holder" label="Large" caption="Element caption" type="large" />
          <Textarea placeholder="Place Holder" label="Default Disabled" caption="Element caption" disabled />
          <Textarea placeholder="Place Holder" label="Small" caption="Element caption" type="small" />
        </div>
      </div>

      <div className={styles.sub_content}>
        <span>Componente Input Search</span>
        <InputSearch hasIcon caption="Element caption" onChange={onChange} placeholder="teste" label="Element label" type="micro"></InputSearch>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
