import { useEffect, useState } from "react";
import styles from "./DropdownSideModal.module.css";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import axios from "axios";
import { useAuth } from "../../../../../context/AuthContext";
import Images from "../../../../../assets";

type GoalsType = {
  id: string;
  userId: string;
  name: string;
  isOpen?: boolean;
  goal: GoalsInternType[];
};

type GoalsInternType = {
  id: string;
  title: string;
  conclude: boolean;
};

type GetUserType = {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  main: string;
  profile: any;
  note: any[];
  level: number;
  exp: number;
};

const DropdownSideModal = () => {
  const { user } = useAuth();
  const [userByEmail, setUserByEmail] = useState<GetUserType>();
  const [goals, setGoals] = useState<GoalsType[]>([]);

  const getUser = async () => {
    try {
      const userData = await axios.get(
        `http://localhost:4000/api/user/${user.email}`
      );
      setUserByEmail(userData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const getGoals = async () => {
    try {
      if (userByEmail) {
        const goalsGet = await axios.get(
          `http://localhost:4000/api/goalList/${userByEmail.email}`
        );
        if (goalsGet.data) {
          const goalsData = goalsGet.data.map((goal: GoalsType) => ({
            ...goal,
            isOpen: false,
          }));
          setGoals(goalsData);
        }
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateGoal = async (id: string, conclude?: boolean, title?: string) => {
    try {
      const goalsGet = await axios.patch(
        `http://localhost:4000/api/goal/${id!}`,
        { title, conclude }
      );
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userByEmail && getGoals();
  }, [userByEmail]);

  const handleClick = (id: string) => {
    goals &&
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
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === props.idGoal) {
            let toogleIsOpen = goal.isOpen;
            return {
              ...goal,
              goal: goal.goal.map((goalsIntern: any) => {
                if (goalsIntern.id === props.id) {
                  updateGoal(goalsIntern.id, props.props, goalsIntern.title);
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

  if (goals.length > 0) {
    return (
      <div>
        {goals.map((goal: GoalsType) => (
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
                    {goal.goal.filter((item) => item.conclude === true).length}
                  </p>
                  <span>/{goal.goal.length} </span>
                </div>
                <ProgressBar
                  width={306}
                  totalValue={goal.goal.length}
                  relativeValue={
                    goal.goal.filter((item) => item.conclude === true).length
                  }
                />
              </div>
              {goal.isOpen &&
                goal.goal.map((goalsIntern) => (
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
  } else {
    return (
      <div className={styles.dropdown_noGoals_container}>
        <div className={styles.dropdown_noGoals_inner}>
          <img src={Images.noGoals} alt="icon if no have goals" />
          <p>Não foi atribuído nenhuma meta</p>
        </div>
      </div>
    );
  }
};

export default DropdownSideModal;
