import React from "react";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import styles from "./CardCourse.module.css";
import IconVerified from "@mui/icons-material/VerifiedOutlined";
import IconTask from "@mui/icons-material/TaskAltOutlined";
import IconArrow from "@mui/icons-material/East";
import IconAlert from "@mui/icons-material/ErrorOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { CourseResponse } from "../../CursosScreen";

type cardCourseProp = {
  title: string;
  //   1: concluido, 2: encaminhado, 3: não começou ainda
  concluded: number;
  onClickIrAoCurso: () => void;
  onClickColectEmblem: () => void;
  onClickEditCourse: () => void;
  intern: boolean;
  emblem: boolean;
  type: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
};

const CardCurso = ({
  onClickColectEmblem,
  onClickIrAoCurso,
  onClickEditCourse,
  title,
  concluded,
  intern,
  emblem,
  type,
}: cardCourseProp) => {
  // console.log("Tem emblema? " + emblem + "\nCompletou o curso? " + concluded);
  // console.log(type);

  const textConcluded =
    concluded === 1
      ? "Parabéns! Você concluiu esse curso!"
      : concluded === 2
      ? "Você ainda não terminou esse curso."
      : "Você ainda não começou esse curso.";

  let textButton = "Editar curso";
  let icon = <CreateOutlinedIcon />;
  let disabled = false;

  if (intern) {
    icon = <IconVerified />;
    textButton = "Coletar emblema";
    if (concluded != 1) disabled = true;
    else if (emblem) {
      textButton = "Emblema obtido";
      disabled = true;
    }
  }
  // id: string;
  // name: string;
  // description: string;
  // level: "LOW" | "MEDIUM" | "HIGH";
  // workload: number;
  // learning: string;
  // skills: string;
  // trailId: string;
  // teacherId: string;
  // modules: Module[];
  return (
    <div className={styles.container_card}>
      <div className={styles.description_card}>
        <p className={styles.legend_card}>
          {type === "COURSE"
            ? "Curso "
            : type === "LECTURE"
            ? "Palestra "
            : type === "TRAINING"
            ? "Treinamento "
            : "Workshop "}
          | Rethink Academy
        </p>
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
      <div className={styles.actions_card_embassador}>
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
          onClick={!intern ? onClickEditCourse : onClickColectEmblem}
          icon={icon}
          width={218}
          position="right"
          type={disabled ? "disabled" : "secondary"}
          text={textButton}
          size="medium"
        />
      </div>
    </div>
  );
};

export default CardCurso;
