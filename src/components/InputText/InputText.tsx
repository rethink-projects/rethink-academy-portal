import React from "react";

// Styles
import styles from "./InputText.module.css";

type InputTextProps = {
  type: "micro" | "default" | "small" | "large" | "block" | "extraLarge";
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasIcon: Boolean;
  iconPosition?: "left" | "both" | "right";
  label?: string;
  nameInput: string;
  elementCaption?: string;
  left?: JSX.Element;
  right?: JSX.Element;
  value: string;
  onClickRight?: () => void;
  onClickLeft?: () => void;
};

const InputText = ({
  type,
  placeholder,
  onChange,
  hasIcon,
  iconPosition,
  label,
  nameInput,
  elementCaption,
  left,
  right,
  value,
  onClickRight,
  onClickLeft,
}: InputTextProps) => {
  let container, inputLabel, input, icon, field;

  switch (type) {
    case "micro":
      container = styles.inputText_containerMicro;
      inputLabel = styles.inputText_labelMicro;
      input = styles.inputText_inputMicro;
      icon = styles.inputText_iconMicro;
      field = styles.inputText_fieldMicro;
      break;
    case "default":
      container = styles.inputText_containerDefault;
      inputLabel = styles.inputText_labelDefault;
      input = styles.inputText_inputDefault;
      icon = styles.inputText_iconDefault;
      field = styles.inputText_fieldDefault;
      break;
    case "block":
      container = styles.inputText_containerBlock;
      inputLabel = styles.inputText_labelDefault;
      input = styles.inputText_inputBlock;
      icon = styles.inputText_iconDefault;
      field = styles.inputText_fieldDefault;
      break;
    case "small":
      container = styles.inputText_containerSmall;
      inputLabel = styles.inputText_labelSmall;
      input = styles.inputText_inputSmall;
      icon = styles.inputText_iconSmall;
      field = styles.inputText_fieldSmall;
      break;
    case "large":
      container = styles.inputText_containerLarge;
      inputLabel = styles.inputText_labelLarge;
      input = styles.inputText_inputLarge;
      icon = styles.inputText_iconLarge;
      field = styles.inputText_fieldLarge;
      break;
    case "extraLarge":
      container = styles.inputText_containerExtraLarge;
      inputLabel = styles.inputText_labelDefault;
      input = styles.inputText_inputExtraLarge;
      icon = styles.inputText_iconDefault;
      field = styles.inputText_fieldDefault;
      break;
  }

  return (
    <label className={container}>
      {label && <p className={inputLabel}>{label}</p>}

      <div className={input}>
        {hasIcon && iconPosition !== "right" && (
          <div className={icon} onClick={onClickLeft}>
            {hasIcon && left}
          </div>
        )}

        <input
          className={field}
          type="text"
          name={nameInput}
          required
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />

        {hasIcon && iconPosition !== "left" && (
          <div className={icon} onClick={onClickRight}>
            {hasIcon && right}
          </div>
        )}
      </div>
      {elementCaption && (
        <p className={styles.inputText_caption}>{elementCaption}</p>
      )}
    </label>
  );
};

export default InputText;
