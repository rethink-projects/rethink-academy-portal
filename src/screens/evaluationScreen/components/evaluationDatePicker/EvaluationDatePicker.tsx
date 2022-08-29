import React, { useEffect } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import brLocale from "date-fns/locale/pt-BR";

export default function EvaluationDatePicker({
  month,
  setMonth,
}: {
  month: string;
  setMonth: (value: string) => void;
}) {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const data = value?.toString();
  let dataSplit = data?.split(" ");
  const returnData = dataSplit ? dataSplit[1].concat(" ", dataSplit[3]) : "";

  useEffect(() => {
    setMonth(returnData);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={brLocale}>
      <DatePicker
        views={["year", "month"]}
        label="Mês e Ano"
        minDate={new Date("2012-03-01")}
        maxDate={new Date("2023-06-01")}
        value={value}
        onChange={(newValue: React.SetStateAction<Date | null>) => {
          setValue(newValue);
        }}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField {...params} helperText={null} />
        )}
      />
    </LocalizationProvider>
  );
}
