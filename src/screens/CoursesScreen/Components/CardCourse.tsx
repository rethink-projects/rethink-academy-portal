import React from "react";
import ButtonWithIcon from "../../../components/ButtonWithIcon/ButtonWithIcon";
import styles from "./CardCourse.module.css";
import IconVerified from "@mui/icons-material/VerifiedOutlined";
import IconTask from "@mui/icons-material/TaskAltOutlined";
import IconArrow from "@mui/icons-material/East";
import IconAlert from "@mui/icons-material/ErrorOutlineOutlined";

type cardCourseProp = {
  title: string;
  //   1: concluido, 2: encaminhado, 3: não começou ainda
  concluded: number;
};

const CardCourse = ({ title, concluded }: cardCourseProp) => {
  const textConcluded =
    concluded === 1
      ? "Parabéns! Você concluiu esse curso!"
      : concluded === 2
      ? "Você ainda não terminou esse curso."
      : "Você ainda não começou esse curso.";

  return (
    <div className={styles.container_card}>
      <div className={styles.content_card}>
        <div className={styles.description_card}>
          <p className={styles.legend_card}>Curso | Rethink Academy</p>
          <h1 className={styles.title_card}>{title}</h1>
          <div className={styles.container_status_card}>
            {concluded === 1 ? (
              <IconTask className={styles.IconTask} />
            ) : concluded === 2 ? (
              <IconAlert className={styles.IconAlert} />
            ) : (
              ""
            )}
            <h2 className={styles.status_card}>{textConcluded}</h2>
          </div>
        </div>
        <div className={styles.actions_card}>
          <ButtonWithIcon
            icon={<IconArrow />}
            width={218}
            position="right"
            type="primary"
            text="Ir para o curso"
            size="medium"
          />
          <ButtonWithIcon
            icon={<IconVerified />}
            width={218}
            position="right"
            type="secondary"
            text="Coletar emblema"
            size="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default CardCourse;
