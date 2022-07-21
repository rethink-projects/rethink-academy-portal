import React from "react";

// Styles
import styles from "./Register.module.css";

// Components
import IconButton from "../IconButton/IconButton";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Task } from "@mui/icons-material";
import Tasks from "./Components/Tasks";

const Register = () => {
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
            <Tasks
              title="Protótipo - Portal Rethink"
              status="progress"
              time="--"
            />
            <Tasks
              title="Alinhamento com a Squad"
              status="completed"
              time="1h"
            />
            <Tasks
              title="Redesign Uber - Curso UX..."
              status="completed"
              time="45min"
            />
            <Tasks
              title="Redesign Uber - Curso UX..."
              status="completed"
              time="45min"
            />
            <Tasks
              title="Redesign Uber - Curso UX..."
              status="completed"
              time="45min"
            />
            <Tasks
              title="Redesign Uber - Curso UX..."
              status="completed"
              time="45min"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
