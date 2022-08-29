import React, { useState } from "react";
import "./styles.css";
import { DateRange } from "react-date-range";
import pt from "date-fns/locale/pt";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComponent = () => {
  const [state, setState] = useState<
    { startDate?: Date; endDate?: Date; key?: string }[]
  >([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
