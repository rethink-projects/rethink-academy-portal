import React, { useEffect, useState } from "react";
import styles from "./LastGoalsCard.module.css";
import Images from "../../assets/index";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

type cardProps = {
  studentEmail?: string;
};

const LastGoalsCard = ({ studentEmail }: cardProps) => {
  const { user } = useAuth();
  const [goalList, setGoalList] = useState<any>();
  const [goals, setGoals] = useState<any>();

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
  }, [user]);

  if (goals && goalList) {
    let completedGoals = goals.filter((goal: any) => goal.conclude === true);

    return (
      <div className={styles.LastGoalsCard_container}>
        {!studentEmail && (
          <div className={styles.LastGoalsCard_title}>
            <img src={Images.LastGoalsFlag} alt="bandeira" />
            <h1>Últimas Metas</h1>
          </div>
        )}

        <div className={styles.LastGoalsCard_info}>
          {studentEmail && <div className={styles.cardTitle}>Metas</div>}
          <div className={styles.LastGoalsCard_inner}>
            <div className={styles.LastGoalsCard_inner_title_badge}>
              <img src={Images.LastGoalsMedal} alt="medalha ultimas Goals" />
              <div className={styles.LastGoalsCard_inner_info}>
                <h1>{goalList.name}</h1>
                <p>
                  {goals.length < 10 ? `0${goals.length}` : goals.length} Metas
                </p>
              </div>
            </div>

            {!studentEmail && (
              <ArrowForwardIosRoundedIcon
                onClick={() => {}}
                className={styles.LastGoalsCard_arrow}
              />
            )}
          </div>
          <div className={styles.LastGoalsCard_line}></div>
          <div className={styles.LastGoalsCard_progress}>
            <div className={styles.progress_Goals}>
              <p>{completedGoals.length} </p>
              <span>/{goals.length} </span>
            </div>
            <ProgressBar
              width={256}
              totalValue={goals.length}
              relativeValue={completedGoals.length}
            />
            <img src={Images.LastGoalsAmpoule} alt="ampulheta" />
          </div>
          <div>
            {studentEmail && (
              <div className={styles.seeDetailsButton}>
                <ButtonWithIcon
                  icon={<ArrowForwardIosRoundedIcon />}
                  position="right"
                  size="small"
                  text="Ver detalhes"
                  type="secondary"
                  width={309}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    const month = new Date().getMonth();

    const allMonths = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return (
      <div className={styles.LastGoalsCard_container}>
        {!studentEmail && (
          <div className={styles.LastGoalsCard_title}>
            <img src={Images.LastGoalsFlag} alt="bandeira" />
            <h1>Últimas Metas</h1>
          </div>
        )}

        <div className={styles.LastGoalsCard_info}>
          {studentEmail && <div className={styles.cardTitle}>Metas</div>}
          <div className={styles.LastGoalsCard_inner}>
            <img src={Images.LastGoalsMedal} alt="medalha ultimas Goals" />
            <div className={styles.LastGoalsCard_inner_info}>
              <h1>Avaliação de {allMonths[month]}</h1>
              <p>00 Metas</p>
            </div>
            {!studentEmail && (
              <ArrowForwardIosRoundedIcon
                onClick={() => {}}
                className={styles.LastGoalsCard_arrow}
              />
            )}
          </div>
          <div className={styles.LastGoalsCard_line}></div>
          <div className={styles.LastGoalsCard_progress}>
            <div className={styles.progress_Goals}>
              <p>0 </p>
              <span>/0 </span>
            </div>
            <ProgressBar width={256} totalValue={0} relativeValue={0} />
            <img src={Images.LastGoalsAmpoule} alt="ampulheta" />
          </div>
          <div>
            {studentEmail && (
              <div className={styles.seeDetailsButton}>
                <ButtonWithIcon
                  icon={<ArrowForwardIosRoundedIcon />}
                  position="right"
                  size="small"
                  text="Ver detalhes"
                  type="secondary"
                  width={309}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default LastGoalsCard;
