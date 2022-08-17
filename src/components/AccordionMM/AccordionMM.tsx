import React, { useState } from "react";

// CSS
import styles from "./AccordionMM.module.css";

// Assets
import Images from "../../assets";
import Tooltip from "../Tooltip/Tooltip";

type AccordionMMProps = {
  hasIcons?: boolean;
  size?: string;
  description: string;
  time: string;
  tags: string[];
};

const AccordionMM = ({
  hasIcons = false,
  size = "small",
  description,
  time,
  tags,
}: AccordionMMProps) => {
  const [active, setActive] = useState(false);

  return (
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
            <p>Atividades do Estagiário</p>
          </div>
          <div className={styles.accordion_label_right}>
            <p>1h45</p>

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
  );
};

export default AccordionMM;