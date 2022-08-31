import React, { useState } from "react";
import styles from "./DropdownSideModal.module.css";
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
      {
        id: 8,
        title: "Finalizar protótipo",
        conclude: false,
      },
      {
        id: 9,
        title: "Meta 04",
        conclude: false,
      },
      {
        id: 10,
        title: "Meta 05",
        conclude: false,
      },
      {
        id: 11,
        title: "Meta 06",
        conclude: false,
      },
      {
        id: 12,
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

const DropdownSideModal = () => {
  const [goals, setGoals] = useState<GoalsDataType[]>(goalsData);

  const handleClick = (id: number) => {
    setGoals(() =>
      goals.map((goal: any) => {
        if (goal.id === id) {
          let toogleIsOpen = goal.isOpen;
          return {
            ...goal,
            isOpen: !toogleIsOpen,
          };
        } else {
          return {
            ...goal,
          };
        }
      })
    );
  };

  const handleIsChecked = (props: any) => {
    setGoals(() =>
      goals.map((goal: any) => {
        if (goal.id === props.idGoal) {
          let toogleIsOpen = goal.isOpen;
          return {
            ...goal,
            goalsIntern: goal.goalsIntern.map((goalsIntern: any) => {
              if (goalsIntern.id === props.id) {
                return {
                  ...goalsIntern,
                  conclude: props.props,
                };
              } else {
                return {
                  ...goalsIntern,
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

  return (
    <div>
      {goals.map((goal: GoalsDataType) => (
        <div
          className={
            goal.isOpen
              ? styles.dropdown_container_open
              : styles.dropdown_container_closed
          }
          key={goal.id}
        >
          <div className={styles.dropdown_header}>
            <h1 className={styles.dropdown_header_title}>{goal.name}</h1>
            <ExpandMoreRoundedIcon
              onClick={() => handleClick(goal.id)}
              className={
                goal.isOpen
                  ? styles.dropdown_header_img_toggle
                  : styles.dropdown_header_img_toggle_closed
              }
            />
          </div>

          <div
            className={
              goal.isOpen
                ? styles.dropdown_content_open
                : styles.dropdown_content_closed
            }
            key={goal.id}
          >
            <div className={styles.dropdown_content_progress}>
              <div className={styles.dropdown_content_quantity}>
                <p>
                  {
                    goal.goalsIntern.filter((item) => item.conclude === true)
                      .length
                  }
                </p>
                <span>/{goal.goalsIntern.length} </span>
              </div>
              <ProgressBar
                width={306}
                totalValue={goal.goalsIntern.length}
                relativeValue={
                  goal.goalsIntern.filter((item) => item.conclude === true)
                    .length
                }
              />
            </div>
            {goal.isOpen &&
              goal.goalsIntern.map((goalsIntern) => (
                <Checkbox
                  size="small"
                  name={goalsIntern.title}
                  isChecked={goalsIntern.conclude}
                  setIsChecked={(props) =>
                    handleIsChecked({
                      id: goalsIntern.id,
                      props,
                      idGoal: goal.id,
                    })
                  }
                  key={goalsIntern.id}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownSideModal;
