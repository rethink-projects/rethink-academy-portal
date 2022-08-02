import React from "react";
import Images from "../../assets";
import Styles from "./StageIcon.module.css";
const StageIcon = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <div
      className={!disabled ? Styles.outer_border : Styles.outer_border_disabled}
    >
      <div className={Styles.white_background}>
        <img
          src={!disabled ? Images.Emblem : Images.Emblem_Disable}
          alt="Stage Emblem"
          className={Styles.emblem}
        />
      </div>
    </div>
  );
};

export default StageIcon;
