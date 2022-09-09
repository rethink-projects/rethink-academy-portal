import React, { useEffect, useState } from "react";
import "./styles.css";
import { DateRange } from "react-date-range";
import pt from "date-fns/locale/pt";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAuth } from "../../../context/AuthContext";
import { getDateFilter } from "../../../services/backend/Tasks";

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

type CalendarProps = {
  setTasks?: (value: task[]) => void;
  update?: boolean;
};

const CalendarComponent = ({ setTasks, update }: CalendarProps) => {
  const { user } = useAuth();

  const date = new Date();

  const [state, setState] = useState<
    { startDate?: Date; endDate?: Date; key?: string }[]
  >([
    {
      startDate: new Date(date.valueOf() - date.getTimezoneOffset() * 60000), // PEGAR DATA ATUAL
      endDate: new Date(date.valueOf() - date.getTimezoneOffset() * 60000),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (state) {
      changeTasks();
    }
  }, [state, user]);

  useEffect(() => {
    if (update) changeTasks();
  }, [update]);

  const changeTasks = async () => {
    if (user) {
      await getDateFilter(
        user.email!,
        getFullDate(state[0].startDate!),
        getFullDate(state[0].endDate!)
      )
        .then((response) => {
          if (setTasks) {
            setTasks(response!);
          }
        })
        .catch((err) => console.error(err));
    }
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
    <DateRange
      className={"large"}
      editableDateInputs={true}
      onChange={(item) => {
        setState([item.selection]);
        console.log(item.selection);
      }}
      moveRangeOnFirstSelection={false}
      ranges={state}
      locale={pt}
      showMonthAndYearPickers={false}
      showDateDisplay={false}
    />
  );
};

export default CalendarComponent;
