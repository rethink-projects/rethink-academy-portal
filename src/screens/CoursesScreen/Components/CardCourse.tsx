import React from "react";
import ButtonWithIcon from "../../../components/ButtonWithIcon/ButtonWithIcon";
import styles from "./CardCourse.module.css";
import IconVerified from "@mui/icons-material/VerifiedOutlined";
import IconTask from "@mui/icons-material/TaskAltOutlined";
import IconArrow from "@mui/icons-material/East";
import IconAlert from "@mui/icons-material/ErrorOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

type cardCourseProp = {
  title: string;
  //   1: concluido, 2: encaminhado, 3: não começou ainda
  concluded: number;
  onClickIrAoCurso: () => void;
  onClickColetarEmblema: () => void;
  intern: boolean;
  emblem: boolean;
};

const CardCurso = ({
  onClickColetarEmblema,
  onClickIrAoCurso,
  title,
  concluded,
  intern,
  emblem,
}: cardCourseProp) => {
  const textConcluded =
    concluded === 1
      ? "Parabéns! Você concluiu esse curso!"
      : concluded === 2
      ? "Você ainda não terminou esse curso."
      : "Você ainda não começou esse curso.";

  let textButton = "Editar Trilha";
  let icon = <CreateOutlinedIcon />;
  let disabled = false;

  if (intern) {
    icon = <IconVerified />;
    textButton = "Coletar emblema";
    if (emblem) textButton = "Emblema obtido";
  }

  return (
    <div
      className={
        intern ? styles.container_card : styles.container_card_ambassador
      }
    >
      <div className={styles.description_card}>
        <p className={styles.legend_card}>Curso | Rethink Academy</p>
        <h1 className={styles.title_card}>{title}</h1>
        {intern && (
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
        )}
      </div>
      <div
        className={
          intern ? styles.actions_card : styles.actions_card_embassador
        }
      >
        <ButtonWithIcon
          onClick={onClickIrAoCurso}
          icon={<IconArrow />}
          width={218}
          position="right"
          type="primary"
          text="Ir para o curso"
          size="medium"
        />
        <ButtonWithIcon
          onClick={onClickColetarEmblema}
          icon={icon}
          width={218}
          position="right"
          type="secondary"
          text={textButton}
          size="medium"
        />
      </div>
    </div>
  );
};

export default CardCurso;
