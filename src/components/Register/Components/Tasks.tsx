import React from "react";

// Styles
import styles from "./Tasks.module.css";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";

type TasksProps = {
  title: string;
  status: "completed" | "progress";
  time: string;
};

const Tasks = ({ title, status = "completed", time }: TasksProps) => {
  return (
    <div className={styles.task_container}>
      <div className={styles.task_iconTitle}>
        <div className={`${styles.task_icon} ${styles[status]}`}>
          {status === "progress" ? <AccessTimeIcon /> : <CheckIcon />}
        </div>
        <h5 className={styles.task_title}>{title}</h5>
      </div>
      <p className={styles.task_time}>{time}</p>
    </div>
  );
};

export default Tasks;
