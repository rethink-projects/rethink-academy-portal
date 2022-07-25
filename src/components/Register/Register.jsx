import React from "react";

// Styles
import styles from "./Register.module.css";

// Components
import Tasks from "./Components/Tasks";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const Register = () => {
  const tasks = [
    { title: "Protótipo - Portal Rethink", status: "progress", time: "--" },
    { title: "Alinhamento com a Squad", status: "completed", time: "1h" },
    {
      title: "Redesign Uber - Curso UX...",
      status: "completed",
      time: "45min",
    },
    { title: "Daily Engenharia", status: "completed", time: "15min" },
  ];

  return (
    <div className={styles.register_container}>
      <div className={styles.register_title}>
        <div className={styles.register_title_icon}>
          <AccessAlarmIcon />
        </div>
        <h1>Registros do Dia</h1>
      </div>
      <div className={styles.register_content}>
        <div className={styles.register_header}>
          <div className={styles.register_header_infos}>
            <div className={styles.register_header_infos_iconsHours}>
              <div className={styles.register_header_infos_icon}>
                <AccessTimeIcon />
              </div>
              <div className={styles.register_header_infos_hoursRegisters}>
                <div className={styles.register_header_infos_hours}>
                  <p className={styles.register_header_infos_hoursDone}>3h</p>
                  <p className={styles.register_header_infos_hoursTotal}>/6h</p>
                </div>
                <p className={styles.register_header_infos_register}>
                  Registradas
                </p>
              </div>
            </div>
            <div className={styles.register_header_infos_arrow}>
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
        <div className={styles.register_body}>
          <div className={styles.register_body_title}>
            <p>Status</p>
            <p className={styles.register_body_title_time}>Tempo</p>
          </div>
          <div className={styles.register_body_infos}>
            {tasks &&
              tasks.map((task) => (
                <Tasks
                  key={task.title}
                  title={task.title}
                  status={task.status}
                  time={task.time}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
