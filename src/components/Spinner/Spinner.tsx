import React from "react";
import styles from "./Spinner.module.css";

type SpinnerProps = {
  type: "light" | "dark";
  size: "big" | "small";
  isLoading: Boolean;
};

const Spinner = ({
  type = "light",
  size = "small",
  isLoading = false,
}: SpinnerProps) => {
  const getClassByType = () => {
    let currentType = styles.default_loading_spinner;
    let config = type + size;
    switch (config) {
      case "lightsmall":
        currentType = styles.small_light_loading_spinner;
        break;
      case "darksmall":
        currentType = styles.small_dark_loading_spinner;
        break;
      case "darkbig":
        currentType = styles.dark_loading_spinner;
        break;
      default:
        break;
    }
    return currentType;
  };

  return (
    <div className={styles.spinner_container}>
      {isLoading && <div className={getClassByType()}></div>}
    </div>
  );
};

export default Spinner;
