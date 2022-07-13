import { useState } from "react";
import { Images } from "../../assets/";
import styles from "./Dropdown.module.css";
import Eye from "@mui/icons-material/VisibilityOutlined";
import ArrowDown from "@mui/icons-material/KeyboardArrowDownOutlined";
import ArrowUp from "@mui/icons-material/KeyboardArrowUpOutlined";
type DropDownProps = {
  chave: number;
  content: string[];
  initialText?: string;
  disabled?: boolean;
  size?: "small" | "micro" | "default" | "large";
};

const DropDown = ({
  content,
  chave = 0,
  initialText = "Escolha",
  size = "default",
  disabled = false,
}: DropDownProps) => {
  const itemDropSize =
    size === "large" ? 61 : size === "small" ? 36 : size === "micro" ? 31 : 41;
  const startGap =
    size === "large" ? 12 : size === "micro" ? 4 : size === "small" ? 8 : 14;
  const iconSize = size === "small" || size === "micro" ? 17 : 22;
  const color = disabled
    ? "var(--color-tertiary-hover)"
    : "var(--color-tertiary-active)";

  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialText);
  const [isFilled, setIsFilled] = useState(false);

  document.addEventListener("click", (e: Event) => {
    if (
      !document
        .getElementById("dropdown" + chave)!
        .contains(e.target as HTMLInputElement)
    ) {
      // Clicked out of the box
      setIsActive(false);
      console.log("aqui");
    }
  });
  document.addEventListener("click", (e: Event) => {
    if (
      document
        .getElementById("arrowDown" + chave)!
        .contains(e.target as HTMLInputElement)
    ) {
      // Clicked out of the box
      setIsActive(!isActive);
    }
  });

  return (
    <div>
      <div
        className={[
          styles.dropdown,
          isFilled && styles.dropdown_filled,
          isActive && styles.dropdown_active,
          disabled && styles.dropdown_disabled,
          styles["dropdown_" + size],
        ].join(" ")}
        id={`dropdown${chave}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={styles.left_img} onClick={() => setIsActive(!isActive)}>
          <Eye sx={{ fontSize: iconSize, color: color }} />
        </div>
        {/* <img src={Images.icons.eye} alt="Visualize" /> */}
        <span>{placeholder}</span>
        <div
          onClick={() => setIsActive(!isActive)}
          className={[styles.rightImage, styles["rightImage_" + size]].join(
            " "
          )}
        >
          {!isActive ? (
            <ArrowDown
              id={"arrowDown" + chave}
              sx={{ fontSize: iconSize * 1.3, color: color }}
            />
          ) : (
            <ArrowUp sx={{ fontSize: iconSize * 1.3, color: color }} />
          )}
          {/* <img src={Images.icons.showmore} alt="Visualize" /> */}
        </div>
        {isActive &&
          content.map((item, index) => (
            <div
              key={index * startGap}
              style={{ top: `${(index + 1) * itemDropSize + startGap}px` }}
              className={[
                styles.dropdown_content,
                styles["dropdown_content_" + size],
                index == 0 && styles.dropdown_content_first,
                index == content.length - 1 && styles.dropdown_content_lastt,
              ].join(" ")}
              onClick={() => (setPlaceholder(item), setIsFilled(true))}
            >
              <p>{item}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
