import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import IconArrow from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  CheckCircleOutline,
  HighlightOff,
  ErrorOutline,
} from "@mui/icons-material";
import { red, yellow } from "@mui/material/colors";

type DropdownProps = {
  setValue: (value: string) => void;
  value: string;
  id: string;
  size?: "small" | "micro" | "default" | "large";
  initialText?: string;
  width: number;
  disabled?: boolean;
};

const StatusDropdown = ({
  setValue,
  value,
  id,
  initialText = "Selecione",
  disabled,
  size = "default",
  width,
}: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialText);
  const [isFilled, setIsFilled] = useState(false);
  const options = ["Ativo", "Pendente", "Encerrado"];

  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      if (
        !document
          .getElementById("dropdown" + id)!
          .contains(e.target as HTMLInputElement)
      ) {
        setIsActive(false);
      }
    });
  }, []);

  let leftIcon;

  value === "Ativo"
    ? (leftIcon = <CheckCircleOutline color="success" />)
    : value === "Encerrado"
    ? (leftIcon = <HighlightOff sx={{ color: red[600] }} />)
    : value === "Pendente"
    ? (leftIcon = <ErrorOutline sx={{ color: yellow[700] }} />)
    : (leftIcon = "");

  return (
    <div className={styles.dropdown_container} style={{ width: width }}>
      <div
        id={`dropdown${id}`}
        onClick={() => setIsActive(!isActive)}
        className={[
          styles.dropdown,
          isFilled && styles.dropdown_filled,
          isActive && styles.dropdown_active,
          disabled && styles.dropdown_disabled,
          styles[value],
          styles["dropdown_" + size],
        ].join(" ")}
      >
        <div className={styles.inner_left}>
          {leftIcon}
          {placeholder}
        </div>
        <IconArrow />
      </div>
      <div className={styles.dropdown_options_container}>
        {isActive &&
          options.map((option, index) => (
            <div
              className={[
                styles.dropdown_option,
                styles["dropdown_option_" + size],
              ].join(" ")}
              key={index}
              onClick={() => (
                setIsActive(!isActive),
                setPlaceholder(option),
                setValue(option),
                setIsFilled(true)
              )}
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  );
};

export default StatusDropdown;
