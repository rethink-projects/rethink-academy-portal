import React, { useState, useEffect } from "react";

// Styles
import styles from "./Register.module.css";

// Components
import Tasks from "./Components/Tasks";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  getGroupTaskByTag,
  getRecordOfDay,
} from "../../services/backend/Tasks";

type RegisterProps = {
  type?: "ambassador" | "intern" | "home";
};

const Register = ({ type = "home" }: RegisterProps) => {
  type Tag = {
    title: string;
    realTime: number;
    hours: number;
    minutes: number;
  };

  type Record = {
    id: string;
    name: string;
    status: "Concluído" | "Em progresso" | "Validação" | "Prioridade";
    hours: number;
    minutes: number;
    time: number;
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [records, setRecords] = useState<Record[]>([]);

  const [time, setTime] = useState(0);
  const [controler, setControler] = useState(false);

  const changeData = async () => {
    if (type === "home") {
      await getRecordOfDay("fabiana.kamo@rethink.dev")
        .then((response) => {
          setRecords(response);
        })
        .catch((err) => console.error(err));
    } else {
      await getGroupTaskByTag("fabiana.kamo@rethink.dev")
        .then((response) => {
          setTags(response);
        })
        .catch((err) => console.error(err));
    }
  };

  const changeHours = async () => {
    tags.map((tag) => {
      return setTime(time + tag.realTime);
    });
    setTime(time / 60);
  };

  useEffect(() => {
    changeData();
    changeHours();
  }, []);

  let colorIcon = "";
  type === "home" ? (colorIcon = "red") : (colorIcon = "black");

  let heightContainer = "";
  type === "intern" ? (heightContainer = "small") : (heightContainer = "large");

  const formatDate = (hours: number, minutes: number) => {
    if (minutes === 0) {
      return `${hours}h`;
    } else if (minutes < 10) {
      if (hours === 0) {
        return `0${minutes}min`;
      }
      return `${hours}h0${minutes}min`;
    }

    if (hours === 0) return `${minutes}min`;

    return `${hours}h${minutes}min`;
  };

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
                  <p className={styles.register_header_infos_hoursDone}>
                    {type === "home" ? "*h" : time}
                  </p>
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
              {type === "home"
                ? records.map((record) => (
                    <Tasks
                      key={record.id}
                      title={record.name}
                      status={record.status}
                      time={formatDate(record.hours, record.minutes)}
                    />
                  ))
                : tags.map((tag) => {
                    return (
                      <Tasks
                        key={tag.title}
                        title={tag.title}
                        time={formatDate(tag.hours, tag.minutes)}
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
