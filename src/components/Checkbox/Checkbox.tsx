import style from "./Checkbox.module.css";

type checkboxProps = {
  size?: "default" | "small";
  name: string;
  disabled?: boolean;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
};

const Checkbox = ({
  name,
  size = "default",
  disabled = false,
  isChecked = false,
  setIsChecked,
}: checkboxProps) => {
  return (
    <label className={style.container}>
      <input
        className={style.checkbox_input}
        type="checkbox"
        onChange={(event) => setIsChecked(event.target.checked)}
        disabled={disabled}
        checked={isChecked}
      />
      <svg
        className={`${style.checkbox} ${style[size]} ${
          isChecked ? style.checkbox_active : ""
        }`}
        aria-hidden
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          width="12"
          height="8"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.979774 4.3131C1.17504 4.11784 1.49162 4.11784 1.68688 4.3131L3.99999 6.62622L10.3131 0.313103C10.5084 0.117841 10.825 0.117841 11.0202 0.313103C11.2155 0.508365 11.2155 0.824948 11.0202 1.02021L4.35355 7.68688C4.15829 7.88214 3.8417 7.88214 3.64644 7.68688L0.979774 5.02021C0.784512 4.82495 0.784512 4.50837 0.979774 4.3131Z"
          fill={isChecked ? "#F9F9F9" : ""}
        />
      </svg>
      {name}
    </label>
  );
};

export default Checkbox;
