import React from "react";
import styles from "./Textarea.module.css";

type TextareaProps = {
  type?: "default" | "small" | "large" | "block";
  placeholder: string;
  onChangetext?: (e: any) => void;
  caption?: string;
  label?: string;
  disabled?: boolean;
};

function Textarea({
  type = "default",
  placeholder,
  onChangetext,
  caption,
  label,
  disabled,
}: TextareaProps) {
  const disabledClass = disabled ? styles.textarea_disabled : "";

  return (
    <div
      className={[
        styles.textarea_default_container,
        styles["textarea_container_" + type],
      ].join(" ")}
    >
      {label && <p>{label}</p>}
      <textarea
        name={placeholder}
        id={placeholder}
        placeholder={placeholder}
        className={[
          styles.textarea_default,
          styles["textarea_" + type],
          disabledClass,
        ].join(" ")}
        onChange={onChangetext}
      ></textarea>
      {caption && <p className={styles.textarea_caption}>{caption}</p>}
    </div>
  );
}

export default Textarea;
