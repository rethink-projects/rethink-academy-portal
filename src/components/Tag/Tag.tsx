import styles from "./Tag.module.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

type TagProps = {
  color?: "dark" | "light";
  size?: "large" | "default" | "small" | "micro";
  text: string;
  onClickAdd: () => void;
  onClickDelete: () => void;
};

const Tag = ({
  color = "light",
  size = "default",
  text,
  onClickAdd,
  onClickDelete,
}: TagProps) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={`${styles[color]} ${styles[size]} ${styles.container_tag} ${
        !toggle ? "" : color === "dark" ? styles.activeDark : styles.activeLight
      }`}
      onClick={() => {
        toggle ? setToggle(false) : setToggle(true);
      }}
    >
      <div className={styles.divLeft}>
        <div className={styles.AddIcon}>
          <AddIcon />
        </div>
        <span>{text}</span>
      </div>

      <div className={styles.divRight}>
        <div className={styles.barra}></div>
        <div className={styles.ClearIcon}>
          <ClearIcon className="ClearIcon" />
        </div>
      </div>
    </div>
  );
};

export default Tag;
