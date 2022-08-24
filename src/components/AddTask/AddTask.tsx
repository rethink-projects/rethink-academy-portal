import React from "react";
import Images from "../../assets";
import styles from "./AddTask.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddTask() {
  let iconImg = Images.arrowTask;

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <p className={styles.title}>Registro de Tarefas</p>
      </div>
      <div className={styles.input_form}>
        <span>Adicionar uma atividade</span>
        <button className={styles.iconBtn}>
          <div className={styles.addCircle}>
            <AddCircleOutlineIcon />
          </div>
        </button>
      </div>
      <div className={styles.containner}>
        <p className={styles.textone}>
          Você ainda não possui tarefas cadastradas!
        </p>
        <p className={styles.texttwo}>Comece por aqui</p>
        <img className={styles.iconImg} src={iconImg} alt="arrow image" />
      </div>
    </div>
  );
}

export default AddTask;
