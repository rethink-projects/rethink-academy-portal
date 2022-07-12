import React from 'react'
import styles from "./Textarea.module.css";

type TextareaProps = {
    type?: "default" | "small" | "large",
    placeholder: string,
    onChange?: () => void,
    caption?: string,
    label?: string,
    disabled?: boolean,
}

function Textarea({type = "default", placeholder, onChange, caption, label, disabled}: TextareaProps) {
  return (
    <div className={[styles.textarea_default_container, styles["textarea_container_"+type]].join(" ")}>
        {label && <p>{label}</p>}
        <textarea name={placeholder} id={placeholder} placeholder={placeholder} className={[styles.textarea_default, styles["textarea_type_"+type], styles["textarea_disabled_"+disabled]].join(" ")} ></textarea>
        {caption && <p className={styles.textarea_caption}>{caption}</p>}
    </div>
  )
}

export default Textarea