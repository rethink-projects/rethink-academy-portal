import React from "react";
import Images from "../../assets";
import styles from "./AddTask.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddTask() {
  let iconImg = Images.arrowTask;

  return (
    <div className={styles.container}>
      <div className={styles.input_form}>
        <span>Adicionar uma atividade</span>
        <div className={styles.addCircle}>
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className={styles.containner}>
        <p className={styles.textone}>
          Você ainda não possui tarefas cadastradas!
        </p>
        <p className={styles.texttwo}>Comece por aqui</p>
        <img className={styles.iconImg} src={iconImg} alt="my image" />
      </div>
    </div>
  );
}

export default AddTask;
