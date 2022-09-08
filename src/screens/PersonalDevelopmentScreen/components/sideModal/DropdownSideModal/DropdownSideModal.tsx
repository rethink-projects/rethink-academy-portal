import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import axios from "axios";

import styles from "./DropdownSideModal.module.css";
import Images from "../../../../../assets";

import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import Checkbox from "../../../../../components/Checkbox/Checkbox";

import { GetUserType } from "../SideModal";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Textarea from "../../../../../components/Textarea/Textarea";

type GoalsType = {
  id: string;
  userId: string;
  name: string;
  isOpen?: boolean;
  isDeleteMode?: boolean;
  isUpdateMode?: boolean;
  isDeleteGoalMode?: string;
  isUpdateGoalMode?: string;
  isAddMode?: boolean;
  goal: GoalsInternType[];
};

type GoalsInternType = {
  id: string;
  title: string;
  conclude: boolean;
};

type prospType = {
  stundentEmail?: string | undefined;
  userRole?: string;
};

const DropdownSideModal = ({ stundentEmail, userRole }: prospType) => {
  const { user } = useAuth();
  const [userByEmail, setUserByEmail] = useState<GetUserType>();
  const [checkIsEmbassador, setCheckIsEmbassador] = useState<GetUserType>();
  const [goals, setGoals] = useState<GoalsType[]>([]);

  const [deleteGoalList, setDeleteGoalList] = useState<string>();
  const [updateGoalList, setUpdateGoalList] = useState<string>();
  const [createGoalList, setCreateGoalList] = useState<string>();

  const [newTitleGoal, setNewTitleGoal] = useState("");

  const [addGoalListOpen, setAddGoalListOpen] = useState(false);
  const [titleNewGoalList, setTitleNewGoalList] = useState("");

  const [goalUpdateMode, setGoalUpdateMode] = useState(false);
  const [goalDeleteMode, setGoalDeleteMode] = useState(false);

  const getUser = async () => {
    try {
      if (userRole) {
        if (userRole === "EMBASSADOR") {
          const userData = await axios.get(
            `http://localhost:4000/api/user/${stundentEmail}`
          );
          setUserByEmail(userData.data);
        } else {
          const userData = await axios.get(
            `http://localhost:4000/api/user/${user.email}`
          );
          setUserByEmail(userData.data);
        }
      } else {
        const userData = await axios.get(
          `http://localhost:4000/api/user/${user.email}`
        );
        setUserByEmail(userData.data);
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user, userRole]);

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
            isDeleteMode: false,
            isUpdateMode: false,
            isDeleteGoalMode: "",
            isUpdateGoalMode: "",
            isAddMode: false,
          }));
          setGoals(goalsData);
        }
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userByEmail && getGoals();
  }, [userByEmail, deleteGoalList, updateGoalList, createGoalList]);

  const deleteStudentGoalList = async (id: string) => {
    try {
      const newGoal = await axios.delete(
        `http://localhost:4000/api/goalList/${id!}`
      );
      setDeleteGoalList(id);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudentGoalList = async (id: string, name: string) => {
    try {
      const newGoal = await axios.patch(
        `http://localhost:4000/api/goalList/${id!}`,
        { name }
      );
      setUpdateGoalList(id);
      setNewTitleGoal("");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const createStudentGoalList = async (name: string) => {
    try {
      const newGoal = await axios.post(
        `http://localhost:4000/api/goalList/${stundentEmail!}`,
        { name }
      );
      setCreateGoalList(name);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const editGoal = (
    id: string,
    conclude?: boolean,
    title?: string,
    goalsListId?: string
  ) => {
    const goalsData = goals.map((goal: any) => {
      if (goal.id === goalsListId) {
        return {
          ...goal,
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
  };

  const updateGoal = async (
    id: string,
    conclude?: boolean,
    title?: string,
    goalsListId?: string
  ) => {
    try {
      const goalUpdate = await axios.patch(
        `http://localhost:4000/api/goal/${id!}`,
        { title, conclude }
      );
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
      setNewTitleGoal("");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const createGoal = async (
    goalListId: string,
    conclude?: boolean,
    title?: string
  ) => {
    try {
      const goalCreate = await axios.post(
        `http://localhost:4000/api/goal/${goalListId!}`,
        { title, conclude }
      );
      setCreateGoalList(title);
      setNewTitleGoal("");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const removeGoal = async (id: string, goalsListId: string) => {
    try {
      const goalUpdate = await axios.delete(
        `http://localhost:4000/api/goal/${id!}`
      );
      setDeleteGoalList(id);
      setGoalDeleteMode(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleIsChecked = (
    id: string,
    title: string,
    goalListId: string,
    props: any
  ) => {
    console.log(props);
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

  const handleClickAddGoal = (id: string) => {
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === id) {
            let toogleIsAddMode = goal.isAddMode;
            return {
              ...goal,
              isAddMode: !toogleIsAddMode,
            };
          } else {
            return {
              ...goal,
            };
          }
        })
      );
  };

  const handleClickDeleteGoal = (GoalListId: string, id: string) => {
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === GoalListId && goal.isDeleteGoalMode != id) {
            return {
              ...goal,
              isDeleteGoalMode: id,
              isUpdateGoalMode: "",
            };
          } else {
            return {
              ...goal,
              isDeleteGoalMode: "",
            };
          }
        })
      );
  };

  const handleClickUpdateGoal = (GoalListId: string, id: string) => {
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === GoalListId && goal.isUpdateGoalMode != id) {
            return {
              ...goal,
              isUpdateGoalMode: id,
              isDeleteGoalMode: "",
            };
          } else {
            return {
              ...goal,
              isUpdateGoalMode: "",
            };
          }
        })
      );
  };

  const handleClickDeleteGoalList = (id: string) => {
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === id) {
            let toogleIsDeleteMode = goal.isDeleteMode;
            return {
              ...goal,
              isDeleteMode: !toogleIsDeleteMode,
            };
          } else {
            return {
              ...goal,
            };
          }
        })
      );
  };

  const handleClickUpdateGoalList = (id: string) => {
    goals &&
      setGoals(() =>
        goals.map((goal: any) => {
          if (goal.id === id) {
            let toogleIsUpdateMode = goal.isUpdateMode;
            return {
              ...goal,
              isUpdateMode: !toogleIsUpdateMode,
            };
          } else {
            return {
              ...goal,
            };
          }
        })
      );
  };

  const onChangetextInput = (e: any) => {
    setNewTitleGoal(e.target.value);
  };

  const onChangetext = (e: any) => {
    setTitleNewGoalList(e.target.value);
  };

  const handleClickAddGoalList = () => {
    titleNewGoalList && createStudentGoalList(titleNewGoalList);

    setAddGoalListOpen(false);
  };

  if (goals.length > 0) {
    return (
      <div>
        {userRole === "EMBASSADOR" && (
          <div>
            <div
              className={styles.modal_newGoal}
              onClick={() => setAddGoalListOpen(true)}
            >
              <AddRoundedIcon className={styles.modal_newGoal_icon} />
              <p>Adicionar nova meta</p>
            </div>
            {addGoalListOpen && (
              <div className={styles.modal_newGoal_action}>
                <div className={styles.modal_newGoal_action_header}>
                  <p>Dê um título a meta</p>
                  <CloseRoundedIcon
                    onClick={() => setAddGoalListOpen(false)}
                    className={styles.modal_header_escape}
                  />
                </div>
                <Textarea
                  placeholder={"Digite aqui..."}
                  type={"extraSmall"}
                  onChangetext={onChangetext}
                />
                <button onClick={() => handleClickAddGoalList()}>
                  Adicionar
                </button>
              </div>
            )}
          </div>
        )}
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
              <div className={styles.dropdown_header_icons}>
                {goal.isOpen && userRole === "EMBASSADOR" && (
                  <div className={styles.dropdown_header_icons_open}>
                    <div className={styles.dropdown_header_icons_open_svg}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleClickDeleteGoalList(goal.id)}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H19C19.4142 5.75 19.75 5.41421 19.75 5C19.75 4.58579 19.4142 4.25 19 4.25H14.75V1.6C14.75 0.854416 14.1456 0.25 13.4 0.25H6.6C5.85442 0.25 5.25 0.854415 5.25 1.6V4.25H1ZM13.25 1.75V4.25H6.75V1.75H13.25ZM3.75 9C3.75 8.58579 3.41421 8.25 3 8.25C2.58579 8.25 2.25 8.58579 2.25 9V18.4C2.25 19.1456 2.85441 19.75 3.6 19.75H16.4C17.1456 19.75 17.75 19.1456 17.75 18.4V9C17.75 8.58579 17.4142 8.25 17 8.25C16.5858 8.25 16.25 8.58579 16.25 9V18.25H3.75V9ZM8.75 9C8.75 8.58579 8.41421 8.25 8 8.25C7.58579 8.25 7.25 8.58579 7.25 9V15C7.25 15.4142 7.58579 15.75 8 15.75C8.41421 15.75 8.75 15.4142 8.75 15V9ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                          fill="#B6B4B4"
                        />
                      </svg>
                    </div>
                    {goal.isDeleteMode && (
                      <div className={styles.delete_modal_container}>
                        <div className={styles.delete_modal_container_header}>
                          <p>Tem certeza que deseja excluir?</p>
                          <CloseRoundedIcon
                            className={styles.delete_modal_container_header_esc}
                            onClick={() => handleClickDeleteGoalList(goal.id)}
                          />
                        </div>
                        <button onClick={() => deleteStudentGoalList(goal.id)}>
                          Excluir
                        </button>
                      </div>
                    )}
                    <div className={styles.dropdown_header_icons_open_svg}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleClickUpdateGoalList(goal.id)}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.5806 0.46967L18.5303 5.41942C18.8232 5.71231 18.8232 6.18718 18.5303 6.48008L10.0953 14.9151C9.76712 15.2433 9.322 15.4277 8.85787 15.4277L4.32234 15.4277C3.90813 15.4277 3.57234 15.0919 3.57234 14.6777L3.57234 10.1421C3.57234 9.67801 3.75671 9.23289 4.0849 8.9047L12.5199 0.46967C12.8128 0.176777 13.2877 0.176777 13.5806 0.46967ZM15.1716 7.71751L16.9393 5.94975L13.0503 2.06066L11.2825 3.82843L15.1716 7.71751ZM14.1109 8.77817L10.2218 4.88909L5.14556 9.96536C5.09868 10.0122 5.07234 10.0758 5.07234 10.1421L5.07234 13.9277L8.85787 13.9277C8.92418 13.9277 8.98777 13.9013 9.03465 13.8544L14.1109 8.77817ZM1 18.25C0.585786 18.25 0.25 18.5858 0.25 19C0.25 19.4143 0.585786 19.75 1 19.75H19C19.4142 19.75 19.75 19.4143 19.75 19C19.75 18.5858 19.4142 18.25 19 18.25H1Z"
                          fill="#B6B4B4"
                        />
                      </svg>
                    </div>
                    {goal.isUpdateMode && (
                      <div className={styles.update_modal_container}>
                        <input
                          className={styles.modal_input}
                          placeholder="Digite aqui..."
                          onChange={onChangetextInput}
                        />
                        <CheckRoundedIcon
                          className={styles.update_modal_icon}
                          onClick={() =>
                            newTitleGoal.length > 0
                              ? updateStudentGoalList(goal.id, newTitleGoal)
                              : handleClickUpdateGoalList(goal.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
                <ExpandMoreRoundedIcon
                  onClick={() => handleClick(goal.id)}
                  className={
                    goal.isOpen
                      ? styles.dropdown_header_img_toggle
                      : styles.dropdown_header_img_toggle_closed
                  }
                />
              </div>
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
              {goal.isOpen && (
                <div className={styles.dropdown_content_goals}>
                  {goal.goal.map((goalsIntern) => (
                    <div
                      className={
                        styles.dropdown_content_goals_checkbox_container
                      }
                      key={goalsIntern.id}
                    >
                      <div className={styles.dropdown_content_goals_checkbox}>
                        <Checkbox
                          size="small"
                          name={goalsIntern.title}
                          isChecked={goalsIntern.conclude}
                          setIsChecked={(props) =>
                            handleIsChecked(
                              goalsIntern.id,
                              goalsIntern.title,
                              goal.id,
                              { props }
                            )
                          }
                          key={goalsIntern.id}
                        />
                      </div>
                      {userRole === "EMBASSADOR" && (
                        <div>
                          <div
                            className={
                              styles.dropdown_content_goals_checkbox_actions
                            }
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() =>
                                handleClickDeleteGoal(goal.id, goalsIntern.id)
                              }
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H19C19.4142 5.75 19.75 5.41421 19.75 5C19.75 4.58579 19.4142 4.25 19 4.25H14.75V1.6C14.75 0.854416 14.1456 0.25 13.4 0.25H6.6C5.85442 0.25 5.25 0.854415 5.25 1.6V4.25H1ZM13.25 1.75V4.25H6.75V1.75H13.25ZM3.75 9C3.75 8.58579 3.41421 8.25 3 8.25C2.58579 8.25 2.25 8.58579 2.25 9V18.4C2.25 19.1456 2.85441 19.75 3.6 19.75H16.4C17.1456 19.75 17.75 19.1456 17.75 18.4V9C17.75 8.58579 17.4142 8.25 17 8.25C16.5858 8.25 16.25 8.58579 16.25 9V18.25H3.75V9ZM8.75 9C8.75 8.58579 8.41421 8.25 8 8.25C7.58579 8.25 7.25 8.58579 7.25 9V15C7.25 15.4142 7.58579 15.75 8 15.75C8.41421 15.75 8.75 15.4142 8.75 15V9ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                                fill="#B6B4B4"
                              />
                            </svg>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() =>
                                handleClickUpdateGoal(goal.id, goalsIntern.id)
                              }
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.5806 0.46967L18.5303 5.41942C18.8232 5.71231 18.8232 6.18718 18.5303 6.48008L10.0953 14.9151C9.76712 15.2433 9.322 15.4277 8.85787 15.4277L4.32234 15.4277C3.90813 15.4277 3.57234 15.0919 3.57234 14.6777L3.57234 10.1421C3.57234 9.67801 3.75671 9.23289 4.0849 8.9047L12.5199 0.46967C12.8128 0.176777 13.2877 0.176777 13.5806 0.46967ZM15.1716 7.71751L16.9393 5.94975L13.0503 2.06066L11.2825 3.82843L15.1716 7.71751ZM14.1109 8.77817L10.2218 4.88909L5.14556 9.96536C5.09868 10.0122 5.07234 10.0758 5.07234 10.1421L5.07234 13.9277L8.85787 13.9277C8.92418 13.9277 8.98777 13.9013 9.03465 13.8544L14.1109 8.77817ZM1 18.25C0.585786 18.25 0.25 18.5858 0.25 19C0.25 19.4143 0.585786 19.75 1 19.75H19C19.4142 19.75 19.75 19.4143 19.75 19C19.75 18.5858 19.4142 18.25 19 18.25H1Z"
                                fill="#B6B4B4"
                              />
                            </svg>
                          </div>
                          {goal.isUpdateGoalMode === goalsIntern.id && (
                            <div className={styles.update_goal_modal_container}>
                              <input
                                className={styles.modal_input}
                                placeholder="Digite aqui..."
                                onChange={onChangetextInput}
                              />
                              <CheckRoundedIcon
                                className={styles.update_modal_icon}
                                onClick={() => {
                                  newTitleGoal.length > 0
                                    ? updateGoal(
                                        goalsIntern.id,
                                        goalsIntern.conclude,
                                        newTitleGoal,
                                        goal.id
                                      )
                                    : handleClickUpdateGoal(
                                        goal.id,
                                        goalsIntern.id
                                      );
                                }}
                              />
                            </div>
                          )}
                          {goal.isDeleteGoalMode === goalsIntern.id && (
                            <div className={styles.delete_modal_container_goal}>
                              <div
                                className={styles.delete_modal_container_header}
                              >
                                <p>
                                  Tem certeza que deseja excluir o item "
                                  {goalsIntern.title}"?
                                </p>
                                <CloseRoundedIcon
                                  className={
                                    styles.delete_modal_container_header_esc
                                  }
                                  onClick={() =>
                                    handleClickDeleteGoal(
                                      goal.id,
                                      goalsIntern.id
                                    )
                                  }
                                />
                              </div>
                              <button
                                onClick={() =>
                                  removeGoal(goalsIntern.id, goal.id)
                                }
                              >
                                Excluir
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {userRole === "EMBASSADOR" && (
                    <div>
                      {goal.isAddMode ? (
                        <div className={styles.dropdown_content_goals_create}>
                          <input
                            className={styles.modal_input}
                            placeholder="Adicionar um item"
                            onChange={onChangetextInput}
                          />
                          <CheckRoundedIcon
                            className={styles.update_modal_icon}
                            onClick={() =>
                              newTitleGoal.length > 0
                                ? newTitleGoal.length < 30
                                  ? createGoal(goal.id, false, newTitleGoal)
                                  : handleClickAddGoal(goal.id)
                                : handleClickAddGoal(goal.id)
                            }
                          />
                        </div>
                      ) : (
                        <button
                          className={
                            styles.dropdown_content_goals_create_button
                          }
                          onClick={() => handleClickAddGoal(goal.id)}
                        >
                          Adicionar um item
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div
          className={styles.modal_newGoal}
          onClick={() => setAddGoalListOpen(true)}
        >
          <AddRoundedIcon className={styles.modal_newGoal_icon} />
          <p>Adicionar nova meta</p>
        </div>
        {addGoalListOpen && (
          <div className={styles.modal_newGoal_action}>
            <div className={styles.modal_newGoal_action_header}>
              <p>Dê um título a meta</p>
              <CloseRoundedIcon
                onClick={() => setAddGoalListOpen(false)}
                className={styles.modal_header_escape}
              />
            </div>
            <Textarea
              placeholder={"Digite aqui..."}
              type={"extraSmall"}
              onChangetext={onChangetext}
            />
            <button onClick={() => handleClickAddGoalList()}>Adicionar</button>
          </div>
        )}
        <div className={styles.dropdown_noGoals_container}>
          <div className={styles.dropdown_noGoals_inner}>
            <img src={Images.noGoals} alt="icon if no have goals" />
            <p>Não foi atribuído nenhuma meta</p>
          </div>
        </div>
      </div>
    );
  }
};

export default DropdownSideModal;
