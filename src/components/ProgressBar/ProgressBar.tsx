import React from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  size?: "large" | "medium" | "small";
  color?: "light" | "dark";
  width?: number;
  totalValue: number;
  relativeValue: number;
};

const ProgressBar = ({
  size = "medium",
  color = "dark",
  width = 342,
  totalValue,
  relativeValue,
}: ProgressBarProps) => {
  const internalDivWidth = (relativeValue * width) / totalValue;

  return (
    <div
      style={{ width: width + "px" }}
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
