// import styles from "./Tag.module.css";
import styles from "./Tag.module.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

type TagProps = {
  color?: "dark" | "light";
  size?: "large" | "default" | "small" | "micro";
  type?: string;
  hasIcon?: boolean;
  text: string;
  active: boolean;
  setActive: (data: string, value: string) => void;
};

const Tag = ({
  color = "light",
  size = "default",
  type = "tags",
  hasIcon = true,
  text,
  active = false,
  setActive,
}: TagProps) => {
  return (
    <div
      onClick={() => setActive(type, text)}
      className={`${styles[color]} ${styles[size]} ${styles.container_tag} ${
        !active ? "" : color === "dark" ? styles.activeDark : styles.activeLight
      }`}
    >
      {hasIcon === true && (
        <div className={styles.divLeft}>
          <div onClick={() => setActive(type, text)} className={styles.AddIcon}>
            <AddIcon />
          </div>
        </div>
      )}

      <div className={styles.divCenter}>
        <p>{text}</p>
      </div>

      {hasIcon === true && (
        <div className={styles.divRight}>
          <div className={styles.barra}></div>
          <div onClick={() => setActive(type, "")} className={styles.ClearIcon}>
            <ClearIcon className="ClearIcon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tag;
