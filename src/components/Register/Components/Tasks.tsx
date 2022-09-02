import React from "react";

// Styles
import styles from "./Tasks.module.css";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";

type TasksProps = {
  title: string;
  status: "Concluído" | "Em progresso" | "Validação" | "Prioridade";
  time: string;
  type?: "ambassador" | "intern" | "home";
};

const Tasks = ({
  title,
  status = "Concluído",
  time,
  type = "home",
}: TasksProps) => {
  let colorStatus = "";

  type === "home"
    ? status === "Concluído"
      ? (colorStatus = "completed")
      : (colorStatus = "progress")
    : (colorStatus = "default");

  return (
    <div className={styles.task_container}>
      <div className={styles.task_iconTitle}>
        <div className={`${styles.task_icon} ${styles[colorStatus]}`}>
          {type === "home" ? (
            status === "Em progresso" ? (
              <AccessTimeIcon />
            ) : (
              <CheckIcon />
            )
          ) : (
            <SpeakerNotesOutlinedIcon />
          )}
        </div>
        <h5 className={styles.task_title}>{title}</h5>
      </div>
      <p className={styles.task_time}>{time}</p>
    </div>
  );
};

export default Tasks;
