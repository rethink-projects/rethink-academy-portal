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
import { useAuth } from "../../context/AuthContext";

type RegisterProps = {
  type?: "ambassador" | "intern" | "home";
  email: string;
};

const Register = ({ type = "home", email }: RegisterProps) => {
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

  const { user } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [records, setRecords] = useState<Record[]>([]);

  const [time, setTime] = useState(0);

  const changeData = async () => {
    if (type === "home") {
      await getRecordOfDay(email)
        .then((response) => {
          setRecords(response);
          let helper = 0;
          if (response) {
            response.forEach((record: any) => {
              helper += record.time;
            });
            helper = helper / 60;
            setTime(Math.trunc(helper));
          }
        })
        .catch((err) => console.error(err));
    } else {
      await getGroupTaskByTag(email)
        .then((response) => {
          setTags(response);
          let helper = 0;
          response &&
            response.forEach((tag: any) => {
              helper += tag.realTime;
            });
          helper = helper / 60;
          setTime(Math.trunc(helper));
        })
        .catch((err) => console.error(err));
    }
  };

  // useEffect(() => {
  //   changeData();
  // }, []);

  useEffect(() => {
    changeData();
  }, [email]);

  console.log(email);

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

  console.log(tags);

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
                    {time}
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
              {type === "home" ? (
                records.length > 0 ? (
                  records.map((record) => (
                    <Tasks
                      key={record.id}
                      title={record.name}
                      status={record.status}
                      time={formatDate(record.hours, record.minutes)}
                    />
                  ))
                ) : (
                  <div>Você ainda não possui tasks hoje</div>
                )
              ) : tags && tags.length > 0 ? (
                tags.map((tag) => {
                  return (
                    <Tasks
                      key={tag.title}
                      title={tag.title}
                      time={formatDate(tag.hours, tag.minutes)}
                      type={type}
                    />
                  );
                })
              ) : (
                <div>Estagiário não possui tarefas cadastradas.</div>
              )}
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

export default React.memo(Register);
