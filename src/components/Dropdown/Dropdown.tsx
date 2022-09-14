import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import IconArrow from "@mui/icons-material/KeyboardArrowDownOutlined";

type DropdownProps = {
  value?: string;
  setValue: (value: string) => void;
  options: string[];
  id: string;
  size?: "small" | "micro" | "default" | "large";
  initialText?: string;
  width: number;
  disabled?: boolean;
  leftIcon?: JSX.Element;
};

/*  Necessário um useState no pai. O setState será passado como props no setValue e o value no value
 * exemplo:   const [value, setValue] = useState<string>();
 */
const Dropdown = ({
  initialText,
  setValue,
  options,
  id,
  value,
  disabled,
  size = "default",
  width,
  leftIcon,
}: DropdownProps) => {
  const [placeholder, setPlaceholder] = useState(initialText ?? value);
  const [isFilled, setIsFilled] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  return (
    <div className={styles.dropdown_container} style={{ width: width }}>
      <div
        style={{ width: width, gap: leftIcon ? "14px" : "" }}
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
              style={{ width: width }}
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
