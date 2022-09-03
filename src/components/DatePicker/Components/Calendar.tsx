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
};

const CalendarComponent = ({ setTasks }: CalendarProps) => {
  const { user } = useAuth();

  const [state, setState] = useState<
    { startDate?: Date; endDate?: Date; key?: string }[]
  >([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (state && setTasks) {
      changeTasks();
    }
  }, [state]);

  const changeTasks = async () => {
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
  };

  const getFullDate = (data: Date) => {
    // console.log(data.toISOString());
    return data.toISOString();
  };

  return (
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
  );
};

export default CalendarComponent;
