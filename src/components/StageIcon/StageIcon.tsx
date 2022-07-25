import React from "react";
import Images from "../../assets";
import Styles from "./StageIcon.module.css";
const StageIcon = () => {
  return (
    <div className={Styles.outer_border}>
      <div className={Styles.white_background}>
        <div className={Styles.helper}>
          <div className={Styles.emblem_background_border}>
            <div className={Styles.emblem_background}>
              <img
                src={Images.AcademyIcon}
                alt="Stage Emblem"
                className={Styles.emblem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageIcon;
