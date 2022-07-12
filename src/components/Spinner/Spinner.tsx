import React from "react";
import styles from "./Spinner.module.css";

type SpinnerProps = {
  type: "light" | "dark";
  size: "big" | "small";
  isLoading: Boolean;
};

const Spinner = ({ type, size, isLoading }: SpinnerProps) => {
  const default_loading_spinner =
    type === "light"
      ? size === "big"
        ? styles.default_loading_spinner
        : ` ${styles.small_light_loading_spinner}
      ${styles.default_loading_spinner}`
      : size === "big"
      ? ` ${styles.dark_loading_spinner}
     ${styles.default_loading_spinner}`
      : ` ${styles.dark_loading_spinner}
     ${styles.small_dark_loading_spinner}`;

  return (
    <div className={styles.spinner_container}>
      {isLoading && <div className={default_loading_spinner}></div>}
    </div>
  );
};

export default Spinner;
