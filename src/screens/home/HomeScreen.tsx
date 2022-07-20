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

        <div className={styles.box_trilhas_container}>
          <div className={styles.box_trilhas_header}>
            <h1 className={styles.box_trilhas_header_title}>Trilhas</h1>
          </div>
          <div className={styles.box_trilhas_cards}>

          </div>
        </div>
      </div>
      <button onClick={() => navigate("/playground")}>
        Ir para Playground de componentes
      </button>
    </div>
  );
}

export default HomeScreen;
