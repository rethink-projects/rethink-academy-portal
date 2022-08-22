import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import IconArrow from "@mui/icons-material/KeyboardArrowDownOutlined";

type DropdownProps = {
  setValue: (value: string) => void;
  options: string[];
  id: string;
  size?: "small" | "micro" | "default" | "large";
  initialText?: string;
  width: number;
  disabled?: boolean;
  leftIcon?: JSX.Element;
};

const Dropdown = ({
  setValue,
  options,
  id,
  initialText = "Escolha uma opção",
  disabled,
  size = "default",
  width,
  leftIcon,
}: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialText);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      if (
        !document.getElementById("dropdown" + id)!
        // .contains(e.target as HTMLInputElement)
      ) {
        setIsActive(false);
      }
    });
  }, []);

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

export default Dropdown;
