import React from "react";
import style from "./AvatarWithLevel.module.css";
import Images from "../../assets";

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
          <img src={Images.icons.level_Icon} alt="Ícone de nível" />
          <span>{studentLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarWithLevel;
