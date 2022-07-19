import React from "react";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./Playground.module.css";
import Radio from "../../components/Radio/Radio";
import Avatar from "../../components/Avatar/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Images from "../../../src/assets/index";

function PlaygroundScreen() {
  let iconImg = Images.avatar;

  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h2>Playground de Componentes</h2>
        <p>Insira abaixo o seu componente:</p>
      </div>
      <div>
        <Avatar type="text" size="large" component={<p>S</p>} />
      </div>
      <div>
        <Avatar type="icon" size="large" component={<PersonOutlineIcon />} />
      </div>
      <div>
        <Avatar
          type="image"
          size="large"
          component={<img src={iconImg} alt="user's avatar" />}
        />
      </div>
    </div>
  );
}

export default PlaygroundScreen;
