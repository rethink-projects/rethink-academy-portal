import React, { useState } from "react";

// Styles
import styles from "./Content.module.css";

// Icons
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "../../Tooltip/Tooltip";

type ContentProps = {
  id: string;
  text: string;
  priority: number;
  handleColor: (id: string, color: string, text: string) => void;
  onClickDelete: (id: string) => void;
};

const Content = ({
  id,
  text,
  priority = 3,
  handleColor,
  onClickDelete,
}: ContentProps) => {
  const [textDescription, setTextDescription] = useState(text);
  const [editable, setEditable] = useState(false);
  const [textareaheight, setTextareaheight] = useState(1);

  let color1 = "",
    color2 = "",
    color = "";

  let themeButton = priority === 1 ? "white" : "black";
  let themeBackgroundButton = "backgroundRed";
  if (priority === 2) {
    themeBackgroundButton = "backgroundYellow";
  } else if (priority === 3) {
    themeBackgroundButton = "backgroundGreen";
  }

  const defineColors = () => {
    if (priority === 1) {
      color1 = "green";
      color2 = "yellow";
      color = "red";
    } else if (priority === 2) {
      color1 = "green";
      color2 = "red";
      color = "yellow";
    } else {
      color1 = "red";
      color2 = "yellow";
      color = "green";
    }
  };

  defineColors();

  const changeColor = (color: string) => {
    handleColor(id, color, text);
    defineColors();
  };

  const edit = () => {
    setEditable(true);
  };

  const verify = (e: { key: string; preventDefault(): void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleColor(id, color, textDescription);
      setEditable(false);
    }
  };

  const handleTextDescription = (e: any) => {
    setTextDescription(e.target.value);
    if (e.key === "Enter") {
      setEditable(false);
    }
  };

  function handleChange(event: any) {
    const height = event.target.scrollHeight;
    const rowHeight = 18;
    const trows = Math.ceil(height / rowHeight) - 1;

    if (trows > textareaheight) {
      setTextareaheight(trows);
    }
  }

  return (
    <div className={styles.content_container}>
      <div className={`${styles.content_header} ${styles[color]}`}>
        <div className={styles.content_header_theme}>
          <div
            onClick={() => changeColor(color1)}
            className={`${styles.content_header_theme_option} ${styles[color1]}`}
          ></div>
          <div
            onClick={() => changeColor(color2)}
            className={`${styles.content_header_theme_option} ${styles[color2]}`}
          ></div>
        </div>
        <div className={styles.content_header_actions}>
          <button
            onClick={() => edit()}
            className={`${styles.content_header_actions_icon} ${styles[themeButton]} ${styles[themeBackgroundButton]}`}
          >
            <Tooltip
              content="Editar"
              direction="top"
              children={<BorderColorIcon />}
            />
          </button>
          <button
            onClick={() => onClickDelete(id)}
            className={`${styles.content_header_actions_icon} ${styles[themeButton]} ${styles[themeBackgroundButton]}`}
          >
            <Tooltip
              content="Remover"
              direction="top-left"
              children={<DeleteIcon />}
            />
          </button>
        </div>
      </div>

      <div
        className={styles.content_body}
        suppressContentEditableWarning={true}
        contentEditable={editable}
        onKeyUp={(e) => {
          verify(e);
          e.preventDefault();
        }}
      >
        <p
          style={{ display: editable ? "none" : "inline" }}
          className={styles.content_body_text}
        >
          {textDescription}
        </p>
        {editable && (
          <textarea
            rows={textareaheight}
            value={textDescription}
            onChange={(e) => {
              handleTextDescription(e);
              handleChange(e);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
