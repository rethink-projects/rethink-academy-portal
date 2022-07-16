import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import IconEye from "@mui/icons-material/VisibilityOutlined";
import IconArrow from "@mui/icons-material/KeyboardArrowDownOutlined";

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
  var itemDropSize: number, startGap: number, iconSize, color: string;
  switch (disabled) {
    case true:
      color = "var(--color-tertiary-hover)";
      break;
    default:
      color = "var(--color-tertiary-active)";
      break;
  }
  switch (size) {
    case "large":
      itemDropSize = 62;
      startGap = 12;
      iconSize = 22;
      break;
    case "small":
      itemDropSize = 37;
      startGap = 8;
      iconSize = 17;
      break;
    case "micro":
      itemDropSize = 32;
      startGap = 4;
      iconSize = 17;
      break;
    default:
      itemDropSize = 42;
      startGap = 14;
      iconSize = 22;
      break;
  }

  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialText);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      if (
        !document
          .getElementById("dropdown" + chave)!
          .contains(e.target as HTMLInputElement)
      ) {
        setIsActive(false);
      }
    });
  }, []);

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
          <IconEye sx={{ fontSize: iconSize, color: color }} />
        </div>
        <span>{placeholder}</span>

        <div
          id={"rightImage" + chave}
          className={[styles.rightImage, styles["rightImage_" + size]].join(
            " "
          )}
        >
          <IconArrow
            className={"arrowDown" + chave}
            sx={{
              fontSize: iconSize * 1.3,
              color: color,
              transform: `rotate(${isActive && 180}deg)`,
            }}
          />
        </div>

        {isActive &&
          content.map((item, index) => (
            <div
              key={index * startGap}
              style={{ top: `${(index + 1) * itemDropSize + startGap}px` }}
              className={[
                styles.dropdown_content,
                styles["dropdown_content_" + size],
                index === 0 && styles.dropdown_content_first,
                index === content.length - 1 && styles.dropdown_content_last,
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
