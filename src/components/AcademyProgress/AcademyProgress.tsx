import React from "react";
import { Images } from "../../assets";
import IconAcademyProgress from "../IconAcademyProgress/IconAcademyProgress";
import ProgressBar from "../ProgressBar/ProgressBar";
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
      <div className={Styles.emblem_two}>
        <StageIcon disabled />
      </div>
      <div className={Styles.emblem_three}>
        <StageIcon disabled />
      </div>
      <div className={Styles.chat}>
        <img src={Images.chat} alt="Hello User" />
        <div className={Styles.chat_text}>
          E aí, Luiza Queiroz! <span>👋🏻</span>
        </div>
      </div>
      <div className={Styles.progress_bars}>
        <ProgressBar
          totalValue={100}
          relativeValue={100}
          size="large"
          width={332}
        />
        <ProgressBar
          totalValue={100}
          relativeValue={100}
          size="large"
          width={342}
        />
        <ProgressBar
          totalValue={100}
          relativeValue={100}
          size="large"
          width={342}
        />
      </div>
    </div>
  );
};

export default AcademyProgress;
