import { useState } from "react";

import styles from "./CardMetas.module.css";

import Checkbox from "../Checkbox/Checkbox";

import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ProgressBar from "../ProgressBar/ProgressBar";

type cardProps = {
  id: number;
  month: string;
  isActive: boolean;
  goalsData: goalsData[];
};

type goalsData = {
  id: number;
  title: string;
  isDone: boolean;
};

const goalsDataSim = [
  {
    id: 1,
    month: "Janeiro",
    isActive: true,
    goalsData: [
      { title: "meta 1", isDone: true, id: 1 },
      { title: "meta 2", isDone: false, id: 2 },
      { title: "meta 3", isDone: true, id: 3 },
      { title: "meta 4", isDone: false, id: 4 },
      { title: "meta 5", isDone: true, id: 5 },
      { title: "meta 6", isDone: false, id: 6 },
      { title: "meta 7", isDone: false, id: 7 },
      { title: "meta 8", isDone: true, id: 8 },
      { title: "meta 9", isDone: false, id: 9 },
      { title: "meta 10", isDone: false, id: 10 },
      { title: "meta 11", isDone: true, id: 11 },
      { title: "mes errado", isDone: true, id: 12 },
      {
        title: "mes certo, escrita diferente ",
        isDone: false,
        id: 13,
      },
      // {
      //   title:
      //     "Nome de meta muito grande pra ver como vai ficar a exibição wee =D ......... 1 2 3 4 5 6 7 8 9 10 %¨$&#$%¨esse trem n dá 3 linhas e deu ruim com 3, ver se piora com mais",

      //   isDone: false,
      //   id: 14,
      // },
    ],
  },
  {
    id: 2,
    month: "Outubro",
    isActive: false,
    goalsData: [
      { id: 1, title: "asdfg", isDone: true },
      { id: 2, title: "qwerty", isDone: false },
    ],
  },
];

const CardMetas = () => {
  const [goals, setGoals] = useState<cardProps[]>(goalsDataSim);

  const handleClick = (props: any) => {
    setGoals(() =>
      goals.map((goal: any) => {
        if (goal.isActive) {
          return {
            ...goal,
            goalsData: goal.goalsData.map((goalsData: any) => {
              if (goalsData.id === props.id) {
                return {
                  ...goalsData,
                  isDone: props.props,
                };
              } else {
                return {
                  ...goalsData,
                };
              }
            }),
          };
        } else {
          return {
            ...goal,
          };
        }
      })
    );
  };

  let activeGoals: cardProps = {
    id: 0,
    month: "",
    isActive: true,
    goalsData: [{ id: 0, title: "", isDone: false }],
  };

  goals.map((monthsGoals: any) => {
    if (monthsGoals.isActive) {
      activeGoals = monthsGoals;
    }
  });

  const goalsQuantity = activeGoals.goalsData.length;

  let completedGoals = activeGoals.goalsData.filter(
    (goal) => goal.isDone === true
  );
  let uncompletedGoals = activeGoals.goalsData.filter(
    (goal) => goal.isDone === false
  );

  return (
    <div className={styles.CardUltimasMetas_info}>
      <div className={styles.CardUltimasMetas_inner}>
        <img src={Images.MedalUltimasMetas} alt="medalha ultimas Goals" />

        <div className={styles.CardUltimasMetas_inner_info}>
          <h1>Avaliação de {activeGoals.month}</h1>
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
        {uncompletedGoals.map((value) => {
          return (
            <>
              <Checkbox
                name={value.title}
                size="small"
                isChecked={value.isDone}
                setIsChecked={(props) =>
                  handleClick({
                    id: value.id,
                    props,
                  })
                }
                key={value.id}
              />
            </>
          );
        })}
        {completedGoals.map((value) => {
          return (
            <>
              <Checkbox
                name={value.title}
                size="small"
                isChecked={value.isDone}
                setIsChecked={(props) =>
                  handleClick({
                    id: value.id,
                    props,
                  })
                }
                key={value.id}
              />
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
