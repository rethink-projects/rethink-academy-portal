import { useState } from "react";
import Calendar from "./Components/Calendar";

// CSS
import styles from "./DatePicker.module.css";

// Assets
import Images from "../../assets";

type DatePickerProps = {
  hasIcon?: boolean;
  size: "large" | "default" | "small" | "micro";
  placeholder: string;
};

export const DatePicker = ({
  hasIcon = false,
  size = "default",
  placeholder = "Placeholder",
}: DatePickerProps) => {
  const [active, setActive] = useState(true);

  return (
    <div className={styles.datePicker_container}>
      <div className={`${styles[size]}`}>
        <div className={styles.datePicker_content}>
          {hasIcon && (
            <>
              <img src={Images.icons.eyeIcon} alt="An eye icon" />
            </>
          )}
          <p>{placeholder}</p>
        </div>
        <div className={styles.datePicker_calendarIcon}>
          <img src={Images.icons.calendarIcon} alt="A calendar icon" />
        </div>
      </div>
      <div
        className={styles.datePicker_calendar}
        onClick={() => setActive(!active)}
      >
        <Calendar />
      </div>
    </div>
  );
};
