import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import styles from "./DatePicker.module.css";
import "./styles.css";

const SingleDatePicker = ({
  formDataValue,
  setFormDataValue,
}: {
  formDataValue: string;
  setFormDataValue: (value: string) => void;
}) => {
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(formDataValue.split(".")[0])
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    if (newValue) {
      setFormDataValue(newValue.format());
    }
  };

  return (
    <div className={styles.width}>
      <LocalizationProvider dateAdapter={AdapterDayjs} className={styles.width}>
        <DesktopDatePicker
          className={styles.width}
          label="Date desktop"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={(newValue) => handleChange(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default SingleDatePicker;

// import React, { useEffect, useState } from "react";
// import "./Components/styles.css";
// import { DateRange } from "react-date-range";
// import pt from "date-fns/locale/pt";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// const CalendarComponent = () => {
//   const date = new Date();

//   const [state, setState] = useState<
//     { startDate?: Date; endDate?: Date; key?: string }[]
//   >([
//     {
//       startDate: new Date(date.valueOf() - date.getTimezoneOffset() * 60000), // PEGAR DATA ATUAL
//       endDate: new Date(date.valueOf() - date.getTimezoneOffset() * 60000),
//       key: "selection",
//     },
//   ]);

//   return (
//     <DateRange
//       className={"large"}
//       editableDateInputs={true}
//       onChange={(item) => {
//         setState([item.selection]);
//       }}
//       moveRangeOnFirstSelection={false}
//       ranges={state}
//       locale={pt}
//       showMonthAndYearPickers={false}
//       showDateDisplay={false}
//     />
//   );
// };

// export default CalendarComponent;
