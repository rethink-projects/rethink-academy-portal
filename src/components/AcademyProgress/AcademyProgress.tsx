import React from "react";
import { Images } from "../../assets";
import IconAcademyProgress from "../IconAcademyProgress/IconAcademyProgress";
import ProgressBar from "../ProgressBar/ProgressBar";
import StageIcon from "../StageIcon/StageIcon";
import Styles from "./AcademyProgress.module.css";

type stages = {
  finalDate: number;
  dates: number[];
};

const AcademyProgress = ({ name }: { name: string }) => {
  const iconsInfo = [
    [
      {
        text: "Início",
        top: 48,
        inicialDate: new Date(2022, 2, 7),
        finalDate: new Date(2022, 2, 27),
      },
      {
        text: "Estudos",
        top: 24,
        inicialDate: new Date(2022, 2, 28),
        finalDate: new Date(2022, 3, 20),
      },
      {
        text: "Prática",
        inicialDate: new Date(2022, 3, 21),
        finalDate: new Date(2022, 4, 10),
      },
    ],
    [
      {
        text: "Estudos",
        top: 48,
        inicialDate: new Date(2022, 4, 11),
        finalDate: new Date(2022, 5, 1),
      },
      {
        text: "Estudos",
        top: 24,
        inicialDate: new Date(2022, 5, 2),
        finalDate: new Date(2022, 5, 22),
      },
      {
        text: "Estudos",
        inicialDate: new Date(2022, 5, 23),
        finalDate: new Date(2022, 6, 12),
      },
    ],
    [
      {
        text: "Estudos",
        top: 48,
        inicialDate: new Date(2022, 6, 13),
        finalDate: new Date(2022, 7, 3),
      },
      {
        text: "Estudos",
        top: 24,
        inicialDate: new Date(2022, 7, 4),
        finalDate: new Date(2022, 7, 24),
      },
      {
        text: "Estudos",
        inicialDate: new Date(2022, 7, 25),
        finalDate: new Date(2022, 8, 22),
      },
    ],
  ];

  const getDateRange = (initialDate: Date, finalDate: Date) => {
    const date: Date = new Date(initialDate.getTime());
    let stages: stages[] = [
      {
        finalDate: new Date(2022, 4, 11).getTime(),
        dates: [],
      },
      {
        finalDate: new Date(2022, 6, 13).getTime(),
        dates: [],
      },
      {
        finalDate: new Date(2022, 8, 22).getTime(),
        dates: [],
      },
    ];

    let stageHelper = 0;
    while (date <= finalDate) {
      if (date.getTime() >= stages[stageHelper].finalDate) {
        if (stageHelper < stages.length - 1) {
          stageHelper++;
        }
      }
      stages[stageHelper].dates.push(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    return stages;
  };

  const dateRanges = getDateRange(new Date(2022, 2, 7), new Date(2022, 8, 22));

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
      {iconsInfo.map((icon, i) => (
        <div className={Styles["stage" + (i + 1)]} key={i}>
          {icon.map((icon, j) => (
            <IconAcademyProgress
              key={(i + 1) * (j + 1)}
              text={icon.text}
              top={icon.top}
              inicialDate={icon.inicialDate}
              finalDate={icon.finalDate}
            />
          ))}
        </div>
      ))}
      {dateRanges.map((stage, index) => {
        return (
          <div className={Styles["emblem_" + (index + 1)]} key={index}>
            <StageIcon disabled={stage.finalDate > new Date().getTime()} />
          </div>
        );
      })}

      <div className={Styles.chat}>
        <img src={Images.chat} alt="Hello User" />
        <div className={Styles.chat_text}>
          E aí, {name}! <span>👋🏻</span>
        </div>
      </div>
      <div className={Styles.progress_bars}>
        <ProgressBar
          totalValue={dateRanges[0].dates.length}
          relativeValue={
            dateRanges[0].dates.filter((date) => date <= new Date().getTime())
              .length
          }
          size="large"
          width={332}
        />
        <ProgressBar
          totalValue={dateRanges[1].dates.length}
          relativeValue={
            dateRanges[1].dates.filter((date) => date <= new Date().getTime())
              .length
          }
          size="large"
          width={342}
        />
        <ProgressBar
          totalValue={Math.trunc(dateRanges[2].dates.length / 1.14)}
          relativeValue={Math.trunc(
            dateRanges[2].dates.filter((date) => date <= new Date().getTime())
              .length / 1.14
          )}
          size="large"
          width={342}
        />
      </div>
    </div>
  );
};

export default AcademyProgress;
