import React, { useState } from "react";
import Images from "../../assets";
import styles from "./AddTask.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddTaskForm from "./AddTaskForm/AddTaskForm";

function AddTask() {
  let iconImg = Images.arrowTask;
  const [active, setActive] = useState(false);
  
  return (
    <div className={styles.container}>
        <div className={styles.container_title}>
          <p className={styles.title}>Registro de Tarefas</p>
        </div>
        <div className={styles.container_noactive}>
          {!active && (
            <><div className={styles.input_form}>
            <span>Adicionar uma atividade</span>
            <button
              className={styles.iconBtn}
              onClick={() => setActive(!active)}
            >
              <div className={styles.addCircle}>
                <AddCircleOutlineIcon />
              </div>
            </button>
          </div><div className={styles.containner}>
              <p className={styles.textone}>
                Você ainda não possui tarefas cadastradas!
              </p>
              <p className={styles.texttwo}>Comece por aqui</p>
              <img className={styles.iconImg} src={iconImg} alt="arrow image" />
            </div></>
            )}
        </div>
      <div>
        {active && (
          <AddTaskForm />
        )}
      </div>
    </div>
  );
}

export default AddTask;
