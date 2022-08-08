import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import IconEye from "@mui/icons-material/VisibilityOutlined";
import IconArrow from "@mui/icons-material/KeyboardArrowDownOutlined";

type DropdownProps = {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  key: string;
  size?: "small" | "micro" | "default" | "large";
  initialText?: string;
  disabled?: boolean;
};

const Dropdown = ({
  value,
  setValue,
  options,
  key,
  initialText = "Escolha uma opção",
  disabled,
  size = "default",
}: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialText);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e: Event) => {
      if (
        !document
          .getElementById("dropdown" + key)!
          .contains(e.target as HTMLInputElement)
      ) {
        setIsActive(false);
      }
    });
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown_inner}>
        <IconEye />
        {initialText}
      </div>
      <IconArrow />
    </div>
  );
};

export default Dropdown;
