import { useState } from "react";

import style from "./EvaluationSwitch.module.css";

import SchoolIcon from "@mui/icons-material/School";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

const EvaluationSwitch = ({
  skillType,
  setSkillType,
}: {
  skillType: boolean;
  setSkillType: (value: boolean) => void;
}) => {
  return (
    <div className={style.toggleContainer}>
      <button
        onClick={() => setSkillType(!skillType)}
        className={skillType ? style.active : ""}
      >
        <SchoolIcon />
        Hard Skills
      </button>
      <button
        onClick={() => setSkillType(!skillType)}
        className={!skillType ? style.active : ""}
      >
        <TipsAndUpdatesOutlinedIcon />
        Soft Skills
      </button>
    </div>
  );
};

export default EvaluationSwitch;
