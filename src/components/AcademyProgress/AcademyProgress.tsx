import React from "react";
import { Images } from "../../assets";
import IconAcademyProgress from "../IconAcademyProgress/IconAcademyProgress";
import StageIcon from "../StageIcon/StageIcon";
import Styles from "./AcademyProgress.module.css";

const AcademyProgress = () => {
  return (
    <div className={Styles.background}>
      <img src={Images.homeBackground} alt="home progress" />
      <img src={Images.lines.one} alt="line one" className={Styles.line_one} />

      <img src={Images.lines.two} alt="line two" className={Styles.line_two} />
      <img
        src={Images.lines.three}
        alt="line three"
        className={Styles.line_three}
      />
      <div className={Styles.first_stage}>
        <IconAcademyProgress text="Início" top={48} />
        <IconAcademyProgress text="Estudos" top={24} />
        <IconAcademyProgress text="Prática" />
      </div>
      <div className={Styles.second_stage}>
        <IconAcademyProgress text="Estudos" top={48} now />
        <IconAcademyProgress text="Estudos" top={24} locked />
        <IconAcademyProgress text="Estudos" locked />
      </div>
      <div className={Styles.third_stage}>
        <IconAcademyProgress text="Estudos" top={48} locked />
        <IconAcademyProgress text="Estudos" top={24} locked />
        <IconAcademyProgress text="Estudos" locked />
      </div>

      <div className={Styles.emblem_one}>
        <StageIcon />
      </div>
    </div>
  );
};

export default AcademyProgress;
