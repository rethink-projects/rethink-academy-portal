import React, { useEffect, useState } from "react";
import Images from "../../assets";
import { useAuth } from "../../context/AuthContext";
import { removeTask } from "../../services/backend/Tasks";
import AccordionMM from "../AccordionMM/AccordionMM";
import DatePicker from "../DatePicker/DatePicker";
import InputSearch from "../InputSearch/InputSearch";
import Toast from "../Toast/Toast";

// CSS
import styles from "./AmbassadorViewTasksMM.module.css";

type TypeAmbassadorViewTasksMM = {
  email: string;
};

const AmbassadorViewTasksMM = ({ email }: TypeAmbassadorViewTasksMM) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [update, setUpdate] = useState(false);
  const [thereTask, setThereTask] = useState(true);

  const filterWord = (contentInput: string) => {
    const filter = tasks.map((day: any[]) =>
      day!.filter((task) =>
        task.name.toLowerCase().includes(contentInput.toLowerCase())
      )
    );

    setUpdate(false);
    setTasks(filter);

    if (thereIsTask(filter)) {
      setThereTask(true);
    } else {
      setThereTask(false);
    }
  };

  const changeData = () => {
    setThereTask(true);
    setUpdate(true);
  };

  const thereIsTask = (filter: any[]) => {
    let exist = false;

    if (filter.length > 0) {
      filter.map((task) => {
        if (task[0]) {
          exist = true;
        }
      });
    }
    return exist;
  };

  const handleDelete = (id: string) => {
    removeTask(id);
    setUpdate(true);
  };

  useEffect(() => {
    changeData();
  }, [email]);

  return (
    <div className={styles.viewTasks_container}>
      <div className={styles.viewTasks_header}>
        <div className={styles.viewTasks_input}>
          <InputSearch
            hasIcon
            type="default"
            placeholder="Search"
            onChange={filterWord}
            changeData={changeData}
            disable={false}
          />
        </div>

        <DatePicker
          calendarPosition="right"
          placeholder="Placeholder"
          size="default"
          setTasks={setTasks}
          update={update}
          email={email}
        />
      </div>
      <div className={styles.viewTasks_body}>
        <div className={styles.searchTasks_Tasks}>
          {!thereTask && (
            <div className={styles.error}>
              <Toast
                title=" Não existem tarefas cadastradas com esse nome!"
                type="error"
              />
            </div>
          )}
          {tasks.length > 0 ? (
            tasks.map(
              (day: any[], index) =>
                day[0] && (
                  <div key={index}>
                    <div className={styles.searchTasks_Date}>
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.75 1C13.75 0.585786 13.4142 0.25 13 0.25C12.5858 0.25 12.25 0.585786 12.25 1V2.25H8.5C8.08579 2.25 7.75 2.58579 7.75 3C7.75 3.41421 8.08579 3.75 8.5 3.75H12.25V5C12.25 5.41421 12.5858 5.75 13 5.75C13.4142 5.75 13.75 5.41421 13.75 5V1ZM0.25 9V5C0.25 3.48122 1.48122 2.25 3 2.25H4.25V1C4.25 0.585786 4.58579 0.25 5 0.25C5.41421 0.25 5.75 0.585786 5.75 1V3V5C5.75 5.41421 5.41421 5.75 5 5.75C4.58579 5.75 4.25 5.41421 4.25 5V3.75H3C2.30964 3.75 1.75 4.30964 1.75 5V8.25H18.25V5C18.25 4.30964 17.6904 3.75 17 3.75H16.5C16.0858 3.75 15.75 3.41421 15.75 3C15.75 2.58579 16.0858 2.25 16.5 2.25H17C18.5188 2.25 19.75 3.48122 19.75 5V9V18C19.75 19.5188 18.5188 20.75 17 20.75H3C1.48122 20.75 0.25 19.5188 0.25 18V9ZM1.75 18V9.75H18.25V18C18.25 18.6904 17.6904 19.25 17 19.25H3C2.30964 19.25 1.75 18.6904 1.75 18Z"
                          fill="#6C6F93"
                        />
                      </svg>
                      <p> {day[0].taskDate}</p>
                    </div>
                    <div className={styles.searchTasks_Tasks}>
                      {day.map((task) => {
                        return (
                          <div
                            className={styles.viewTasks_accordion}
                            key={task.id}
                          >
                            <AccordionMM
                              key={task.id}
                              id={task.id}
                              title={task.name}
                              duration={task.duration}
                              description={task.description}
                              tags={[task.tags]}
                              status={[task.status]}
                              time={`${task.startTime} às ${task.endTime}`}
                              size="large"
                              hasIcons={false}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
            )
          ) : (
            <div className={styles.error}>
              <Toast
                title=" Não existem tarefas cadastradas nessa data"
                type="info"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AmbassadorViewTasksMM);
