import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  size?: "large" | "medium" | "small";
  color?: "light" | "dark";
  width?: string;
  totalValue: number;
  relativeValue: number;
};

const ProgressBar = ({
  size = "medium",
  color = "dark",
  width = "342",
  totalValue,
  relativeValue,
}: ProgressBarProps) => {
  const widthValue = width.replace(/\D/g, "") as unknown as number;
  const widthMeasurement = width.match(/\D/g) as unknown as string;
  const internalDivWidth =
    totalValue === 0 ? 0 : (relativeValue * widthValue) / totalValue;

  return (
    <div
      style={{ width: widthValue + widthMeasurement }}
      className={`${styles[size]} ${styles.container_external} ${
        color === "light"
          ? styles.container_external_light
          : styles.container_external_dark
      } `}
    >
      <div
        style={{ width: internalDivWidth + widthMeasurement }}
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
