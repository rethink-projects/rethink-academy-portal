import React, { useState } from "react";

// CSS
import styles from "./AccordionMM.module.css";

// Assets
import Images from "../../assets";

const AccordionMM = () => {
  const [active, setActive] = useState(true);

  return (
    <div className={styles.accordion_container}>
      <div className={styles.accordion_blackBar}>
        <img src={Images.icons.IconEdit} alt="A Edit Icon" />
        <img src={Images.icons.deleteIcon} alt="" />
      </div>
      <div className={styles.accordion_body}>
        <div className={styles.accordion_label}>
          <div className={styles.accordion_labelLeft}>
            <img src={Images.icons.chatIcon} alt="Chat Icon" />
            <p>Atividades do Estagiário</p>
          </div>
          <div className={styles.accordion_labelRight}>
            <p>1h45</p>
            <img src={Images.icons.arrowDownIcon} alt="Chat Icon" />
          </div>
        </div>
      </div>
      {active && <div className={styles.accordion_active}>Descrição</div>}
    </div>
  );
};

export default AccordionMM;
