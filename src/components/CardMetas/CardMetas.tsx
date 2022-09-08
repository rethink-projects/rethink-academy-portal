import { useEffect, useState } from "react";

import styles from "./CardMetas.module.css";

import Checkbox from "../Checkbox/Checkbox";

import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ProgressBar from "../ProgressBar/ProgressBar";
import ModalLateral from "../../screens/desenvolvimentoPessoal/components/modalLateral/ModalLateral";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

type goalList = {
  id: number;
  name: string;
  userId: string;
  user: object;
  goal: goalsData[];
};

type goalsData = {
  id: string;
  title: string;
  conclude: boolean;
  goalListId: string;
};

// const goalsDataSim = [
//   {
//     id: 1,
//     month: "Janeiro",
//     isActive: true,
//     goalsData: [
//       { title: "meta 1", conclude: true, id: 1 },
//       { title: "meta 2", conclude: false, id: 2 },
//       { title: "meta 3", conclude: true, id: 3 },
//       { title: "meta 4", conclude: false, id: 4 },
//       { title: "meta 5", conclude: true, id: 5 },
//       { title: "meta 6", conclude: false, id: 6 },
//       { title: "meta 7", conclude: false, id: 7 },
//       { title: "meta 8", conclude: true, id: 8 },
//       { title: "meta 9", conclude: false, id: 9 },
//       { title: "meta 10", conclude: false, id: 10 },
//       { title: "meta 11", conclude: true, id: 11 },
//       { title: "mes errado", conclude: true, id: 12 },
//       {
//         title: "mes certo, escrita diferente ",
//         conclude: false,
//         id: 13,
//       },
//     ],
//   },
//   {
//     id: 2,
//     month: "Outubro",
//     isActive: false,
//     goalsData: [
//       { id: 1, title: "asdfg", conclude: true },
//       { id: 2, title: "qwerty", conclude: false },
//     ],
//   },
// ];

const CardMetas = () => {
  const { user } = useAuth();

  const [goals, setGoals] = useState<goalList>();
  // const [goals, setGoals] = useState<any>();
  const [isModalOpen, setModalOpen] = useState(false);

  // console.log(goalList);
  console.log(goals);

  const getGoals = async () => {
    if (user?.role === "STUDENT") {
      try {
        const userGoalsList = await axios.get(
          `http://localhost:4000/api/goalList/${user.email}`
        );
        setGoals(userGoalsList.data[userGoalsList.data.length - 1]);
        // setGoals(userGoalsList.data[userGoalsList.data.length - 1].goal);
        return;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getGoals();
  }, [user]);

  const updateGoal = async (
    id: string,
    conclude?: boolean,
    title?: string,
    goalsListId?: string
  ) => {
    // try {
    //   const goalUpdate = await axios.patch(
    //     `http://localhost:4000/api/goal/${id!}`,
    //     { conclude }
    //   );
    //   const goalsData = await goals.map((goal: any) => {
    //     if (goal.id === goalsListId) {
    //       return {
    //         ...goal,
    //         isUpdateGoalMode: "",
    //         goal: goal.goal.map((goalsIntern: any) => {
    //           if (goalsIntern.id === id) {
    //             return {
    //               ...goalsIntern,
    //               title,
    //               conclude,
    //             };
    //           } else {
    //             return {
    //               ...goalsIntern,
    //             };
    //           }
    //         }),
    //       };
    //     } else {
    //       return {
    //         ...goal,
    //       };
    //     }
    // });
    // setGoals(goalsData);
    // setNewTitleGoal("");
    return;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleClick = (
    id: string,
    title: string,
    goalListId: string,
    props: any
  ) => {
    console.log(props);
    // updateGoal(id, props.props, title, goalListId);
    // goals &&
    //   setGoals(() =>
    //     goals.map((goal: any) => {
    //       if (goal.id === props.idGoal) {
    //         return {
    //           ...goal,
    //           goal: goal.goal.map((goalsIntern: any) => {
    //             if (goalsIntern.id === props.id) {
    //               return {
    //                 ...goalsIntern,
    //                 conclude: props.props,
    //               };
    //             } else {
    //               return {
    //                 ...goalsIntern,
    //               };
    //             }
    //           }),
    //         };
    //       } else {
    //         return {
    //           ...goal,
    //         };
    //       }
    //     })
    //   );
  };

  if (goals) {
    let completedGoals = goals.goal.filter(
      (goal: any) => goal.conclude === true
    );
    let uncompletedGoals = goals.goal.filter(
      (goal: any) => goal.conclude === false
    );

    return (
      <div className={styles.CardUltimasMetas_info}>
        <div className={styles.CardUltimasMetas_inner}>
          <img src={Images.LastGoalsMedal} alt="medalha ultimas Goals" />

          <div className={styles.CardUltimasMetas_inner_info}>
            <h1>{goals?.name}</h1>
            <p>
              {goals.goal.length < 10
                ? `0${goals.goal.length}`
                : goals.goal.length}{" "}
              Metas
            </p>
          </div>

          <ArrowForwardIosRoundedIcon
            onClick={() => setModalOpen(true)}
            className={styles.cardUltimasMetas_arrow}
          />
          {isModalOpen && <ModalLateral onClose={() => setModalOpen(false)} />}
        </div>

        <div className={styles.Metas_Container}>
          {uncompletedGoals.reverse().map((value: any, index: number) => {
            return (
              <div key={index} className={styles.Metas_Container_Undone}>
                <Checkbox
                  name={value.title}
                  size="small"
                  isChecked={value.conclude}
                  setIsChecked={(props) =>
                    handleClick(value.id, value.title, goals.goal[index].id, {
                      props,
                    })
                  }
                  key={value.id}
                />
              </div>
            );
          })}
          {completedGoals.reverse().map((value: any, index: number) => {
            return (
              <div key={index} className={styles.Metas_Container_Done}>
                <Checkbox
                  name={value.title}
                  size="small"
                  isChecked={value.conclude}
                  setIsChecked={(props) =>
                    handleClick(value.id, value.title, goals.goal[index].id, {
                      props,
                    })
                  }
                  key={value.id}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.divisingLine}></div>
        <div className={styles.CardUltimasMetas_progress}>
          <div className={styles.progress_Goals}>
            <p>{completedGoals.length} </p>
            <span> /{goals.goal.length} </span>
          </div>

          <ProgressBar
            width={362}
            totalValue={goals.goal.length}
            relativeValue={completedGoals.length}
          />

          <img src={Images.LastGoalsStar} alt="Estrela metas" />
        </div>
      </div>
    );
  }

  return <div>teste</div>;
};

export default CardMetas;
