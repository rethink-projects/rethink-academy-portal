import { Flag, Lock } from "@mui/icons-material";
import React from "react";
import Styles from "./IconAcademyProgress.module.css";
import { useAuth } from "../../context/AuthContext";

const IconAcademyProgress = ({
  text,
  top,
  inicialDate,
  finalDate,
}: {
  text: string;
  top?: number;
  inicialDate: Date;
  finalDate: Date;
}) => {
  const { user } = useAuth();

  const dateNow = new Date();

  let dateDefiner = () => {
    if (inicialDate < dateNow && finalDate > dateNow) {
      return { locked: false, now: true };
    }
    if (inicialDate < dateNow) {
      return { locked: false, now: false };
    }
    return { locked: true, now: false };
  };
  return (
    <div className={Styles.container} style={{ marginTop: top }}>
      <div
        className={
          dateDefiner()!.locked
            ? Styles.outer_border_locked
            : Styles.outer_border
        }
      >
        <div
          className={dateDefiner()!.locked ? Styles.icon_locked : Styles.icon}
        >
          {dateDefiner()!.now ? (
            <img className={Styles.avatar} src={user.avatarUrl} alt="img" />
          ) : !dateDefiner()!.locked ? (
            <Flag htmlColor="rgba(72, 161, 53, 1)" />
          ) : (
            <Lock htmlColor="#9DBA2B" />
          )}
        </div>
      </div>
      <div className={Styles.label}>{text}</div>
    </div>
  );
};

export default IconAcademyProgress;
