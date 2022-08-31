import React, { useState } from "react";
import SideModal from "./components/sideModal/SideModal";

const PersonalDevelopmentScreen = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && <SideModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default PersonalDevelopmentScreen;
