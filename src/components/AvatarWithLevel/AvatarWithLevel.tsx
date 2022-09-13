import { Style } from "@mui/icons-material";
import React from "react";
import style from "./AvatarWithLevel.module.css";

type AvatarWithLevelProps = {
  studentLevel: number;
  avatarSource: string;
};

const AvatarWithLevel = ({
  studentLevel,
  avatarSource,
}: AvatarWithLevelProps) => {
  return (
    <div className={style.avatarContainer}>
      <img
        src={avatarSource}
        alt="Avatar do usuário"
        className={style.avatar}
      />
      <div className={style.levelBadge}>
        <div className={style.level}>
          <img
            src="/static/media/level_Icon.004358a92590e04577854ccefa27c3a2.svg"
            alt="Ícone de nível"
          />
          <span>{studentLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarWithLevel;
