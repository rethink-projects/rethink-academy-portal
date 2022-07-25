import { Flag, Lock } from "@mui/icons-material";
import React from "react";
import Styles from "./IconAcademyProgress.module.css";

const IconAcademyProgress = ({
  text,
  top,
  now = false,
  locked = false,
}: {
  text: string;
  top?: number;
  now?: boolean;
  locked?: boolean;
}) => {
  return (
    <div className={Styles.container} style={{ marginTop: top }}>
      <div
        className={locked ? Styles.outer_border_locked : Styles.outer_border}
      >
        <div className={locked ? Styles.icon_locked : Styles.icon}>
          {now ? (
            <img
              className={Styles.avatar}
              src="https://avatars.githubusercontent.com/u/82178938?v=4"
              alt="img"
            />
          ) : locked ? (
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
