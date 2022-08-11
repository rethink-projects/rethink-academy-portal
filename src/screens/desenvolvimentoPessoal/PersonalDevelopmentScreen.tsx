import React, { useState } from "react";
import ModalLateral from "./components/modalLateral/ModalLateral";
import CardMetas from "../../components/CardMetas/CardMetas";

import style from "./PersonalDevelopmentScreen.module.css";

const PersonalDevelopmentScreen = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={style.centralizando}>
      <CardMetas />
      {/* <button onClick={() => setModalOpen(true)}>Open Modal</button> */}
      {/* {isModalOpen && <ModalLateral onClose={() => setModalOpen(false)} />} */}
    </div>
  );
};

export default PersonalDevelopmentScreen;
