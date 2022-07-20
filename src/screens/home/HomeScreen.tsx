import React from "react";
import { useNavigate } from "react-router";
import { Images } from "../../assets";
import styles from "./Home.module.css";

function HomeScreen() {
  const navigate = useNavigate();
  return (
    <div className={styles.home_container}>
      <div className={styles.home_inner}>
        <img src={Images.logo} alt='Logo Rethink Academy' />
        <span>🚨 Essa Tela está em desenvolvimento</span>
        <span>⏰ Em Breve iniciaremos nossos trabalhos...</span>
        <span>⚠️ Por enquanto confira nossa tela de componentes</span>
      </div>
      <button onClick={() => navigate("/playground")}>
        Ir para Playground de componentes
      </button>
    </div>
  );
}

export default HomeScreen;
