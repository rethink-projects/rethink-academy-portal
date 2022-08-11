import React, { useState } from "react";
import ModalLateral from "./components/modalLateral/ModalLateral";
import CardMetas from "../../components/CardMetas/CardMetas";

import style from "./PersonalDevelopmentScreen.module.css";

const PersonalDevelopmentScreen = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={style.screenInner}>
      <div className={style.centralizando}>
        <div className={style.metasContainer}>
          <h2>Metas</h2>
          <CardMetas />
        </div>
        {/* <button onClick={() => setModalOpen(true)}>Open Modal</button> */}
        {/* {isModalOpen && <ModalLateral onClose={() => setModalOpen(false)} />} */}
      </div>
    </div>
  );
};

export default PersonalDevelopmentScreen;
