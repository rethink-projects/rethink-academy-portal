import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import styles from "./DatePicker.module.css";

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
      console.log(newValue.format());
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
