import React from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  size?: "large" | "medium" | "small";
  color?: "light" | "dark";
  totalValue: number;
  relativeValue: number;
};

const ProgressBar = ({
  size = "medium",
  color = "light",
  totalValue,
  relativeValue,
}: ProgressBarProps) => {
  const internalDivWidth = (relativeValue * 342) / totalValue;

  return (
    <div
      className={`${styles[size]} ${styles.container_external} ${
        color === "light"
          ? styles.container_external_light
          : styles.container_external_dark
      } `}
    >
      <div
        style={{ width: internalDivWidth }}
        className={`${styles[size]} ${
          color === "light"
            ? styles.container_internal_light
            : styles.container_internal_dark
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
