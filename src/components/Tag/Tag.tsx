// import styles from "./Tag.module.css";
import styles from "./Tag.module.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

type TagProps = {
  color?: "dark" | "light";
  size?: "large" | "default" | "small" | "micro";
  hasIcon?: boolean;
  text: string;
  onClickAdd: () => void;
  onClickDelete: () => void;
};

const Tag = ({
  color = "light",
  size = "default",
  hasIcon = true,
  text,
  onClickAdd,
  onClickDelete,
}: TagProps) => {
  const [toggle, setToggle] = useState(false);

  const handleAdd = () => {
    setToggle(true);
    onClickAdd();
  };

  const handleDelete = () => {
    setToggle(false);
    onClickDelete();
  };

  return (
    <div onClick={!toggle ? (handleAdd) : (handleDelete) } 
      className={`${styles[color]} ${styles[size]} ${styles.container_tag} ${
        !toggle ? "" : color === "dark" ? styles.activeDark : styles.activeLight
      }`}>
      <div className={styles.divLeft}>
        {hasIcon == true && (
        <div onClick={handleAdd} className={styles.AddIcon}>
          <AddIcon />
        </div>
        )}
      </div>

      <div className={styles.divCenter}>
        <p>{text}</p>
      </div>

      <div className={styles.divRight}>
        {hasIcon == true && (
        <><div className={styles.barra}></div><div onClick={handleDelete} className={styles.ClearIcon}>
            <ClearIcon className="ClearIcon" />
          </div></>
        )}
      </div>
    </div>
  );
};

export default Tag;
