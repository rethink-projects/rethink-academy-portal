import { useState } from "react";
import { Images } from "../../assets/";
import styles from "./Dropdown.module.css";

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
  initialText = "Escolha uma opção",
  size = "default",
  disabled = false,
}: DropDownProps) => {
  const itemDropSize =
    size === "large" ? 61 : size === "small" ? 36 : size === "micro" ? 31 : 41;
  const startGap =
    size === "large" ? 12 : size === "micro" ? 4 : size === "small" ? 8 : 14;

  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState("Placeholder");
  const [isFilled, setIsFilled] = useState(false);

  document.addEventListener("click", (e: Event) => {
    if (
      !document
        .getElementById("dropdown" + chave)!
        .contains(e.target as HTMLInputElement)
    ) {
      // Clicked out of the box
      setIsActive(false);
    }
  });

  return (
    <div>
      <div
        className={
          [styles.dropdown,
          (isFilled && styles.dropdown_filled),(isActive && styles.dropdown_active),(disabled && styles.dropdown_disabled),styles["dropdown_"+size]].join(" ")
        }
        id={`dropdown${chave}`}
        onClick={() => setIsActive(!isActive)}
      >
        <img className="eye" src={Images.icons.eye} alt="Visualize" />
        <span>{placeholder}</span>
        <div className={[styles.rightImage, styles["rightImage_"+size]].join(" ")}>
          <img src={Images.icons.showmore} alt="Visualize" />
        </div>
        {isActive &&
          content.map((item, index) => (
            <div
              key={index * startGap}
              style={{ top: `${(index + 1) * itemDropSize + startGap}px` }}
              className={[styles.dropdown_content,styles["dropdown_content_"+size]].join(" ")}
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
