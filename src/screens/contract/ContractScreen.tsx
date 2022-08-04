import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import styles from "./ContractScreen.module.css";

const ContractScreen = () => {
  return (
    <div className={styles.contract_outer_container}>
      <div className={styles.breadcrumb}>
        <Breadcrumb
          breadcrumbItems={[
            { title: "Home", link: "/" },
            { title: "Contrato", link: "/contrato" },
          ]}
        />
      </div>
      <div className={styles.contract_title}>Contrato</div>
      <div className={styles.contract_inner_container}>
        <div className={styles.contract_status}>
          <h1>Status do Contrato</h1>
          <p>
            Envie todos os documentos necessários para preencher a barra e obter
            REX's.
          </p>
          <div className={styles.contract_progress_bar}>
            <ProgressBar
              totalValue={8}
              relativeValue={2}
              size="large"
              width={870}
            />
          </div>
        </div>
        <div className={styles.contract_info}>Suas Informações</div>
      </div>
    </div>
  );
};

export default ContractScreen;
