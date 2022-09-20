import { useEffect, useState } from "react";

import styles from "./GoalsCard.module.css";

import Checkbox from "../Checkbox/Checkbox";

import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ProgressBar from "../ProgressBar/ProgressBar";
import SideModal from "../../screens/PersonalDevelopmentScreen/components/sideModal/SideModal";
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

type GoalsCardProps = {
  studentEmail?: string;
};

const GoalsCard = ({ studentEmail }: GoalsCardProps) => {
  const { user } = useAuth();

  const [goalList, setGoalList] = useState<goalList>();
  const [goals, setGoals] = useState<any>();
  const [update, setUpdate] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const getGoalList = async () => {
    if (user?.role === "STUDENT") {
      try {
        const userGoalsList = await axios.get(
          `http://localhost:4000/api/goalList/${user.email}`
        );
        setGoalList(userGoalsList.data[userGoalsList.data.length - 1]);
        setGoals(userGoalsList.data[userGoalsList.data.length - 1].goal);
        return;
      } catch (error) {
        console.log(error);
      }
    }
    if (user?.role === "AMBASSADOR") {
      try {
        const studentGoalsList = await axios.get(
          `http://localhost:4000/api/goalList/${studentEmail}`
        );

        setGoalList(studentGoalsList.data[studentGoalsList.data.length - 1]);
        setGoals(studentGoalsList.data[studentGoalsList.data.length - 1].goal);
        return;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getGoalList();
  }, [user, update, isModalOpen]);

  const updateGoal = async (
    id: string,
    conclude?: boolean,
    title?: string,
    goalsListId?: string
  ) => {
    try {
      const goalUpdate = await axios.patch(
        `http://localhost:4000/api/goal/${id!}`,
        { conclude }
      );
      setUpdate((current) => !current);
      const goalsData = await goals.map((goal: any) => {
        if (goal.id === goalsListId) {
          return {
            ...goal,
            isUpdateGoalMode: "",
            goal: goal.goal.map((goalsIntern: any) => {
              if (goalsIntern.id === id) {
                return {
                  ...goalsIntern,
                  title,
                  conclude,
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
      });
      setGoals(goalsData);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (
    id: string,
    title: string,
    goalListId: string,
    props: any
  ) => {
    updateGoal(id, props.props, title, goalListId);
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === props.idGoal) {
            return {
              ...goal,
              goal: goal.goal.map((goalsIntern: any) => {
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

  if (goals) {
    let completedGoals = goals.filter((goal: any) => goal.conclude === true);
    let uncompletedGoals = goals.filter((goal: any) => goal.conclude === false);

    return (
      <div className={styles.CardUltimasMetas_info}>
        <div className={styles.CardUltimasMetas_inner}>
          <img src={Images.LastGoalsMedal} alt="medalha ultimas Goals" />

          <div className={styles.CardUltimasMetas_inner_info}>
            <h1>{goalList?.name}</h1>
            <p>{goals.length < 10 ? `0${goals.length}` : goals.length} Metas</p>
          </div>

          <ArrowForwardIosRoundedIcon
            onClick={() => setModalOpen(true)}
            className={styles.cardUltimasMetas_arrow}
          />
          {isModalOpen &&
            (studentEmail ? (
              <SideModal
                studentEmail={studentEmail}
                onClose={() => setModalOpen(false)}
              />
            ) : (
              <SideModal onClose={() => setModalOpen(false)} />
            ))}
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
                    handleClick(value.id, value.title, goals.id, { props })
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
                    handleClick(value.id, value.title, goals.id, { props })
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
            <span> /{goals.length} </span>
          </div>

          <ProgressBar
            width={362}
            totalValue={goals.length}
            relativeValue={completedGoals.length}
          />

          <img src={Images.LastGoalsStar} alt="Estrela metas" />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.CardUltimasMetas_info}>
        <div className={styles.noGoals}>
          <div className={styles.noGoalsWarning}>
            <img src={Images.infoNotes} alt="Ícone de informação" />
            <p>Você ainda não possui nenhuma meta.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default GoalsCard;
