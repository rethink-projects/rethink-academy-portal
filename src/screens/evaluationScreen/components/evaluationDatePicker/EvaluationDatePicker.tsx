import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";

export default function ViewsDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  // return (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     <DatePicker
  //       views={["year", "month"]}
  //       label="Year and Month"
  //       minDate={new Date("2012-03-01")}
  //       maxDate={new Date("2023-06-01")}
  //       value={value}
  //       onChange={(newValue: React.SetStateAction<Date | null>) => {
  //         setValue(newValue);
  //       }}
  //       renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
  //         <TextField {...params} helperText={null} />
  //       )}
  //     />
  //   </LocalizationProvider>
  // );
}
