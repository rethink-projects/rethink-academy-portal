import React from "react";

import styles from "./CardMetas.module.css";

import Checkbox from "../Checkbox/Checkbox";

import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ProgressBar from "../ProgressBar/ProgressBar";

type cardProps = {
  goalsData: Array<goalsData>;
  month: string;
};

type goalsData = {
  title: string;
  month: string;
  isDone: boolean;
};

const CardMetas = ({ goalsData, month }: cardProps) => {
  const monthsGoals = goalsData.filter(
    (goal) => goal.month.toLowerCase() === month.toLowerCase()
  );
  const goalsQuantity = monthsGoals.length;

  let completedGoals = monthsGoals.filter((goal) => goal.isDone === true);
  let uncompletedGoals = monthsGoals.filter((goal) => goal.isDone === false);

  return (
    <div className={styles.CardUltimasMetas_info}>
      <div className={styles.CardUltimasMetas_inner}>
        <img src={Images.MedalUltimasMetas} alt="medalha ultimas Goals" />

        <div className={styles.CardUltimasMetas_inner_info}>
          <h1>Avaliação de {month}</h1>
          <p>
            {goalsQuantity < 10 ? `0${goalsQuantity}` : goalsQuantity} Metas
          </p>
        </div>

        <ArrowForwardIosRoundedIcon
          onClick={() => {}}
          className={styles.cardUltimasMetas_arrow}
        />
      </div>

      <div className={styles.Metas_Container}>
        {uncompletedGoals.map((value, index) => {
          return (
            <>
              <Checkbox
                name={value.title}
                size="small"
                isChecked={false}
                setIsChecked={() => {}}
              />
            </>
          );
        })}
        {completedGoals.map((value, index) => {
          return (
            <>
              <>
                <Checkbox
                  name={value.title}
                  size="small"
                  isChecked={true}
                  setIsChecked={() => {}}
                />
              </>
            </>
          );
        })}
      </div>

      <div className={styles.divisingLine}></div>

      <div className={styles.CardUltimasMetas_progress}>
        <div className={styles.progress_Goals}>
          <p>{completedGoals.length} </p>
          <span> /{goalsQuantity} </span>
        </div>

        <ProgressBar
          width={362}
          totalValue={goalsQuantity}
          relativeValue={completedGoals.length}
        />

        <img src={Images.MedalStarMetas} alt="Estrela metas" />
      </div>
    </div>
  );
};

export default CardMetas;
