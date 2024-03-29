import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import pt from "date-fns/locale/pt";

// CSS
import styles from "./DatePicker.module.css";

// Assets
import Images from "../../assets";

import "./Components/styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth } from "../../context/AuthContext";
import { getDateFilter } from "../../services/backend/Tasks";

type task = {
  name: string;
  description: string;
  taskDate: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  tags: string;
  status: string;
  userEmail: string;
  duration: string;
  time: string;
};

type DatePickerProps = {
  hasIcon?: boolean;
  size: "large" | "default" | "small" | "micro" | "block";
  calendarPosition: "left" | "right";
  placeholder: string;
  setTasks?: (value: task[]) => void;
  update?: boolean;
  email?: string;
};

const DatePicker = ({
  hasIcon = false,
  size = "default",
  calendarPosition: position = "left",
  placeholder = "Placeholder",
  setTasks,
  update,
  email,
}: DatePickerProps) => {
  const { user } = useAuth();

  const [active, setActive] = useState(false);

  const date = new Date();
  const modifiedDate = new Date(
    date.valueOf() - date.getTimezoneOffset() * 60000
  );

  let month = modifiedDate.getMonth().toString();
  let day = modifiedDate.getDate().toString();
  let year = modifiedDate.getFullYear().toString();

  if (parseInt(month, 10) < 10) {
    month = "0" + month;
  }
  if (parseInt(day, 10) < 10) {
    day = "0" + day;
  }

  const dateBase = new Date(parseInt(year), parseInt(month), parseInt(day));

  const [state, setState] = useState<
    { startDate?: Date; endDate?: Date; key?: string }[]
  >([
    {
      startDate: dateBase,
      endDate: dateBase,
      key: "selection",
    },
  ]);

  const formatDate = (date: string) => {
    const helper = date.split("/");
    return `${helper[0]}/${helper[1]}`;
  };

  const [dateInitial, setDateInitial] = useState(
    formatDate(
      state[0].startDate!.toLocaleDateString("pt-BR", { timeZone: "UTC" })
    )
  );
  const [dateFinal, setDateFinal] = useState(
    formatDate(
      state[0].endDate!.toLocaleDateString("pt-BR", { timeZone: "UTC" })
    )
  );

  useEffect(() => {
    setDateInitial(
      formatDate(
        state[0].startDate!.toLocaleDateString("pt-BR", { timeZone: "UTC" })
      )
    );
    setDateFinal(
      formatDate(
        state[0].endDate!.toLocaleDateString("pt-BR", { timeZone: "UTC" })
      )
    );
  }, [state]);

  useEffect(() => {
    if (state) {
      changeTasks();
    }
  }, [state, user]);

  useEffect(() => {
    if (update) changeTasks();
  }, [update, email]);

  const changeTasks = async () => {
    await getDateFilter(
      email ? email : user.email,
      getFullDate(state[0].startDate!),
      getFullDate(state[0].endDate!)
    )
      .then((response) => {
        if (setTasks) {
          setTasks(response!);
        }
      })
      .catch((err) => console.error(err));
    // }
  };

  const getFullDate = (data: Date) => {
    let month = (data.getMonth() + 1).toString();
    let day = data.getDate().toString();
    let year = data.getFullYear().toString();

    if (parseInt(month, 10) < 10) {
      month = "0" + month;
    }
    if (parseInt(day, 10) < 10) {
      day = "0" + day;
    }

    return [year, month, day].join("-") + "T00:00:00.000Z";
  };

  return (
    <div
      className={
        active ? styles.datePicker_active : styles.datePicker_container
      }
    >
      <div>
        <div className={`${styles[size]}`} onClick={() => setActive(!active)}>
          <div className={styles.datePicker_content}>
            {hasIcon && (
              <>
                <img src={Images.icons.eyeIcon} alt="An eye icon" />
              </>
            )}
            <p>
              {dateInitial !== dateFinal
                ? `${dateInitial} à ${dateFinal}`
                : `${dateInitial}/${year}`}
            </p>
          </div>
          <div className={styles.datePicker_calendarIcon}>
            <img src={Images.icons.calendarIcon} alt="A calendar icon" />
          </div>
        </div>
      </div>
      {active && (
        <div className={`${styles.datePicker_calendar} ${styles[position]}`}>
          <DateRange
            className={"large"}
            editableDateInputs={true}
            onChange={(item) => {
              setState([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
            locale={pt}
            showMonthAndYearPickers={false}
            showDateDisplay={false}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(DatePicker);
