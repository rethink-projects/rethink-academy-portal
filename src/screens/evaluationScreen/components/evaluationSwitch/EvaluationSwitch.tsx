import { useState } from "react";

import style from "./EvaluationSwitch.module.css";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

const EvaluationSwitch = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const setPublic = () => {
    setIsPublic(true);
    setIsPrivate(false);
  };

  const setPrivate = () => {
    setIsPublic(false);
    setIsPrivate(true);
  };

  return (
    <div className={style.toggleContainer}>
      <button onClick={setPrivate} className={isPrivate ? style.active : ""}>
        <LockOutlinedIcon />
        Privado
      </button>
      <button onClick={setPublic} className={isPublic ? style.active : ""}>
        <PublicOutlinedIcon />
        Público
      </button>
    </div>
  );
};

export default EvaluationSwitch;
