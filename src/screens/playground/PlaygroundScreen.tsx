import React from "react";
import styles from "./Playground.module.css";
import Avatar from "../../components/Avatar/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Images from "../../../src/assets/index";

function PlaygroundScreen() {
  let iconImg = Images.avatar;

  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <h1>Manter essa tela Limpa, após criar o componente</h1>
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
