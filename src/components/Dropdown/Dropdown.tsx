import { useState } from "react";
import styles from "./Dropdown.module.css";
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};
const DropDown = () => {
  const [isActive, setIsActive] = useState(false);
  const [placeholder, setPlaceholder] = useState("Placeholder");
  const [isSelected, setIsSelected] = useState(false);

  document.addEventListener("click", (e: Event) => {
    if (
      document
        .getElementById("dropdown")!
        .contains(e.target as HTMLInputElement)
    ) {
      // Clicked in box
    } else {
      // Clicked outside the box
      setIsActive(false);
    }
  });

  return (
    <div>
      <div
        className={
          styles.dropdown + " " + (isSelected && styles.dropdown_selected)
        }
        id="dropdown"
        onClick={() => (setIsActive(!isActive), console.log(isActive))}
      >
        <span>{placeholder}</span>
        {isActive && (
          <div
            className={styles.dropdown_content}
            onClick={() => setPlaceholder("Hello World!")}
          >
            <p>Hello World!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
