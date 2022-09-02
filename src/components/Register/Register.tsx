import React from "react";

// Styles
import styles from "./Register.module.css";

// Components
import Tasks from "./Components/Tasks";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

type RegisterProps = {
  type?: "ambassador" | "intern" | "home";
};

const Register = ({ type = "home" }: RegisterProps) => {
  const tasks = [
    {
      title: "Protótipo - Portal Rethink",
      status: "Em progresso" as const,
      time: "--",
    },
    {
      title: "Alinhamento com a Squad",
      status: "Concluído" as const,
      time: "1h",
    },
    {
      title: "Redesign Uber - Curso UX...",
      status: "Concluído" as const,
      time: "45min",
    },
    { title: "Daily Engenharia", status: "Concluído" as const, time: "15min" },
  ];

  let colorIcon = "";
  type === "home" ? (colorIcon = "red") : (colorIcon = "black");

  let heightContainer = "";
  type === "intern" ? (heightContainer = "small") : (heightContainer = "large");

  return (
    <div className={styles.register_container}>
      {type === "home" && (
        <div className={styles.register_title}>
          <div className={styles.register_title_icon}>
            <AccessAlarmIcon />
          </div>
          <h1>Registros do Dia</h1>
        </div>
      )}
      <div className={`${styles.register_content} ${styles[heightContainer]}`}>
        {type !== "home" && <h1 className={styles.title}>Atividades</h1>}
        <div className={styles.register_header}>
          <div className={styles.register_header_infos}>
            <div className={styles.register_header_infos_iconsHours}>
              <div
                className={`${styles.register_header_infos_icon} ${styles[colorIcon]}`}
              >
                <AccessTimeIcon />
              </div>
              <div className={styles.register_header_infos_hoursRegisters}>
                <div className={styles.register_header_infos_hours}>
                  <p className={styles.register_header_infos_hoursDone}>3h</p>
                  <p className={styles.register_header_infos_hoursTotal}>
                    /{type === "home" ? "6h" : "120h"}
                  </p>
                </div>
                <p className={styles.register_header_infos_register}>
                  Registradas
                </p>
              </div>
            </div>
            {type === "home" && (
              <div className={styles.register_header_infos_arrow}>
                <ArrowForwardIosIcon />
              </div>
            )}
          </div>
        </div>
        <div
          className={
            type === "home"
              ? styles.register_body
              : `${styles.register_body} ${styles.bodySmall}`
          }
        >
          <div className={styles.register_body_title}>
            {type === "home" ? <p>Status</p> : <p>Tags</p>}
            <p className={styles.register_body_title_time}>Tempo</p>
          </div>
          <div
            className={
              type !== "home"
                ? styles.register_body_infos
                : `${styles.register_body_infos} ${styles.heightBodyInfosHome}`
            }
          >
            <>
              {tasks && type === "home"
                ? tasks.map((task) => (
                    <Tasks
                      key={task.title}
                      title={task.title}
                      status={task.status}
                      time={task.time}
                    />
                  ))
                : tasks.map((task) => {
                    return (
                      <Tasks
                        key={task.title}
                        title={task.title}
                        status={task.status}
                        time={task.time}
                        type={type}
                      />
                    );
                  })}
            </>
          </div>
        </div>
        {type === "ambassador" && (
          <button className={styles.btnHours}>
            Ver registro de horas <ArrowForwardOutlinedIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
