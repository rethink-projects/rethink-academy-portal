import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import styles from "./ContractScreen.module.css";
import {
  CorporateFare,
  Schedule,
  BusinessCenter,
  DirectionsBus,
  LaptopMac,
  InfoOutlined,
} from "@mui/icons-material";
import NewDocumentCard from "./components/NewDocumentCard/NewDocumentCard";
import DocumentCard, { documentsList } from "./components/DocumentCard/DocumentCard";

const Info = {
  college: "Universidade do Estado de Minas Gerais",
  semester: 7,
  workStartTime: 13,
  workEndTime: 19,
  transportationVoucher: 130,
  materialsProvided: [
    "Computador",
    "Teclado",
    "Mouse",
    "Monitor",
    "Apoio ergonômico",
  ],
};

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
          <h1>Documentos</h1>
          <div className={styles.cards_container}>
            {documentsList.map((content) => (
              <DocumentCard
                key={content.id}
                id={content.id}
                name={content.name}
              />
            ))}
            <NewDocumentCard />
          </div>
        </div>
        <div className={styles.contract_info}>
          <h1>Suas Informações</h1>
          <div className={styles.contract_info_card}>
            <div className={styles.contract_info_card_content}>
              <p>
                {" "}
                <CorporateFare /> Faculdade
              </p>
              <span>{Info.college}</span>
              <p>
                {" "}
                <Schedule /> Período
              </p>
              <span>{`${Info.semester}º`}</span>
              <p>
                {" "}
                <BusinessCenter /> Horário de trabalho
              </p>
              <span>{`${Info.workStartTime}h-${Info.workEndTime}h`}</span>
              <p>
                {" "}
                <DirectionsBus /> Média de gasto com Vale Transporte
              </p>
              <span>{`R$${Info.transportationVoucher}/mês`}</span>
              <p>
                {" "}
                <LaptopMac /> Materiais Fornecidos
              </p>
              <span>{Info.materialsProvided.join(", ")}</span>
              <div className={styles.card_content_line} />
              <small>
                <InfoOutlined color="disabled" /> Caso haja algum erro ou algo
                precise ser atualizado, entre em contato com o RH/Embaixador.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractScreen;
