import { useState } from "react";
import Calendar from "./Components/Calendar";

// CSS
import styles from "./DatePicker.module.css";

// Assets
import Images from "../../assets";

type DatePickerProps = {
  hasIcon?: boolean;
  size: "large" | "default" | "small" | "micro";
  calendarPosition: "left" | "right";
  placeholder: string;
};

export const DatePicker = ({
  hasIcon = false,
  size = "default",
  calendarPosition: position = "left",
  placeholder = "Placeholder",
}: DatePickerProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.container}>
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
              <p>{placeholder}</p>
            </div>
            <div className={styles.datePicker_calendarIcon}>
              <img src={Images.icons.calendarIcon} alt="A calendar icon" />
            </div>
          </div>
        </div>
      </div>
      {active && (
        <div className={`${styles.datePicker_calendar} ${styles[position]}`}>
          <Calendar />
        </div>
      )}
    </div>
  );
};
