import React, { useState } from "react";

// CSS
import styles from "./AccordionMM.module.css";

// Assets
import Images from "../../assets";
import Tooltip from "../Tooltip/Tooltip";

type AccordionMMProps = {
  date: string;
  hasIcons?: boolean;
  size?: string;
  title: string;
  duration: string;
  description: string;
  time: string;
  tags: string[];
};

const AccordionMM = ({
  date = "29 de Agosto", // 29 Date e "de Agosto" string?
  hasIcons = false,
  size = "small",
  title = "Daily",
  duration = "0:15", // number?
  description,
  time = "13h - 14:45", //number?
  tags,
}: AccordionMMProps) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div className={styles.accordion_date}>
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.75 1C13.75 0.585786 13.4142 0.25 13 0.25C12.5858 0.25 12.25 0.585786 12.25 1V2.25H8.5C8.08579 2.25 7.75 2.58579 7.75 3C7.75 3.41421 8.08579 3.75 8.5 3.75H12.25V5C12.25 5.41421 12.5858 5.75 13 5.75C13.4142 5.75 13.75 5.41421 13.75 5V1ZM0.25 9V5C0.25 3.48122 1.48122 2.25 3 2.25H4.25V1C4.25 0.585786 4.58579 0.25 5 0.25C5.41421 0.25 5.75 0.585786 5.75 1V3V5C5.75 5.41421 5.41421 5.75 5 5.75C4.58579 5.75 4.25 5.41421 4.25 5V3.75H3C2.30964 3.75 1.75 4.30964 1.75 5V8.25H18.25V5C18.25 4.30964 17.6904 3.75 17 3.75H16.5C16.0858 3.75 15.75 3.41421 15.75 3C15.75 2.58579 16.0858 2.25 16.5 2.25H17C18.5188 2.25 19.75 3.48122 19.75 5V9V18C19.75 19.5188 18.5188 20.75 17 20.75H3C1.48122 20.75 0.25 19.5188 0.25 18V9ZM1.75 18V9.75H18.25V18C18.25 18.6904 17.6904 19.25 17 19.25H3C2.30964 19.25 1.75 18.6904 1.75 18Z"
            fill="#6C6F93"
          />
        </svg>
        <p>{date}</p>
      </div>
      <div className={[styles.accordion, styles[size]].join(" ")}>
        <div className={styles.accordion_blackBar}>
          {hasIcons && (
            <>
              <Tooltip content="Editar" direction="top">
                <img src={Images.icons.IconEdit} alt="A Edit Icon"></img>
              </Tooltip>
              <Tooltip content="Deletar" direction="top">
                <img src={Images.icons.deleteIcon} alt=""></img>
              </Tooltip>
            </>
          )}
        </div>
        <div className={styles.accordion_body}>
          <div
            className={styles.accordion_label}
            onClick={() => setActive(!active)}
            style={{ borderBottom: active ? "1px solid #d4d4d4" : " " }}
          >
            <div className={styles.accordion_label_left}>
              <img src={Images.icons.chatIcon} alt="Chat Icon" />
              <p>{title}</p>
            </div>
            <div className={styles.accordion_label_right}>
              <p>{duration}</p>
              <img
                src={Images.icons.arrowDownIcon}
                alt="Chat Icon"
                style={{ transform: active ? "rotate(-180deg)" : "" }}
              />
            </div>
          </div>
          {active && (
            <div className={styles.accordion_active}>
              <div className={styles.accordion_activeText}>Descrição</div>
              <div className={styles.accordion_activeText}>
                <p>{description}</p>
              </div>
              <div className={styles.accordion_activeText}>
                <div className={styles.accordion_tags}>
                  {tags.map((tag, index) => (
                    <span key={index}> {tag} </span>
                  ))}
                </div>
                <div className={styles.accordion_footer}>{time}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionMM;
