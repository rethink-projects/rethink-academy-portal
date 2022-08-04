import React, { useState } from "react";
import styles from "./DropdownModalLateral.module.css";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { GlobalStyles } from "@mui/styled-engine";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import Checkbox from "../../../../../components/Checkbox/Checkbox";

// imitando banco de dados
type GoalsDataType = {
  name: string;
  isOpen: boolean;
  id: number;
  goalsIntern: GoalsInternType[];
};

type GoalsInternType = {
  id: number;
  title: string;
  conclude: boolean;
};

const goalsData = [
  {
    name: "Avaliação de março",
    isOpen: false,
    id: 1,
    goalsIntern: [
      {
        id: 1,
        title: "Estudar Acesssibilidade",
        conclude: true,
      },
      {
        id: 2,
        title: "Aplicar liderança",
        conclude: true,
      },
      {
        id: 3,
        title: "Finalizar protótipo",
        conclude: false,
      },
      {
        id: 4,
        title: "Meta 04",
        conclude: false,
      },
      {
        id: 5,
        title: "Meta 05",
        conclude: false,
      },
      {
        id: 6,
        title: "Meta 06",
        conclude: false,
      },
      {
        id: 7,
        title: "Meta 07",
        conclude: false,
      },
    ],
  },
  {
    name: "Avaliação de outro mes",
    isOpen: false,
    id: 2,
    goalsIntern: [
      {
        id: 1,
        title: "Estudar Acesssibilidade",
        conclude: true,
      },
      {
        id: 2,
        title: "Aplicar liderança",
        conclude: true,
      },
      {
        id: 3,
        title: "Finalizar protótipo",
        conclude: false,
      },
      {
        id: 4,
        title: "Meta 04",
        conclude: false,
      },
      {
        id: 5,
        title: "Meta 05",
        conclude: false,
      },
      {
        id: 6,
        title: "Meta 06",
        conclude: false,
      },
      {
        id: 7,
        title: "Meta 07",
        conclude: false,
      },
    ],
  },
  {
    name: "Avaliação de outro mes ainda",
    isOpen: false,
    id: 3,
    goalsIntern: [
      {
        id: 1,
        title: "Estudar Acesssibilidade",
        conclude: true,
      },
      {
        id: 2,
        title: "Aplicar liderança",
        conclude: true,
      },
      {
        id: 3,
        title: "Finalizar protótipo",
        conclude: false,
      },
      {
        id: 4,
        title: "Meta 04",
        conclude: false,
      },
      {
        id: 5,
        title: "Meta 05",
        conclude: false,
      },
      {
        id: 6,
        title: "Meta 06",
        conclude: false,
      },
      {
        id: 7,
        title: "Meta 07",
        conclude: false,
      },
    ],
  },
];

const DropdownModalLateral = () => {
  const [goals, setGoals] = useState<GoalsDataType[]>(goalsData);
  console.log(goals)

  const handleClick = (id: number) => {
    setGoals(() =>
      goals.map((goal: any) => {
        console.log(goal)
        if (goal.id === id) {
          let toogleIsOpen = goal.isOpen;
          return {
            ...goal,
            isOpen: !toogleIsOpen,
          };
          console.log(goal)
        }
        else{
          return{
            ...goal,
          }
        }
      })
    );
    console.log(goals);
  };

  // const currentClass = isOpen
  //   ? styles.dropdown_container_open
  //   : styles.dropdown_container_closed;

  const [concludeGoals, setConcludeGoals] = useState(1);

  function getGoalsConclude() {
    let i = 0;
    let j = 0;
    if ((j < goals.length, j++)) {
      if ((i < goals[j].goalsIntern.length, i++)) {
        if (goals[j].goalsIntern[i].conclude == true) {
          setConcludeGoals(concludeGoals + 1);
        }
      }
    }

    return concludeGoals;
  }
  console.log(concludeGoals);

  return (
    <div>
      {goals.map((goal:GoalsDataType) => (
        <div className={goal.isOpen ? styles.dropdown_container_open
          : styles.dropdown_container_closed}
          key={goal.id}>
          <div className={styles.dropdown_header}>
            <h1 className={styles.dropdown_header_title}>{goal.name}</h1>
            <ExpandMoreRoundedIcon
              // onClick={() => handleClick(goal.id)}
              onClick={() => handleClick(goal.id)}
              className={
                goal.isOpen
                  ? styles.dropdown_header_img_toggle
                  : styles.dropdown_header_img_toggle_closed
              }
            />
          </div>
          {goal.isOpen && (
            <div className={styles.dropdown_content} key={goal.id}>
              <div className={styles.dropdown_content_progress}>
                <div className={styles.dropdown_content_quantity}>
                  <p>{getGoalsConclude()} </p>
                  <span>/{goal.goalsIntern.length} </span>
                </div>
                <ProgressBar
                  width={306}
                  totalValue={goal.goalsIntern.length}
                  relativeValue={concludeGoals}
                />
              </div>
              {goal.goalsIntern.map((goalsIntern,index) => (
                <>
                <Checkbox
                  name={goalsIntern.title}
                  checked={goalsIntern.conclude}
                  key={index}
                />
                {console.log(goalsIntern.conclude)}
                </>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownModalLateral;
