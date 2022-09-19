import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { infoType } from "../../screens/contract/ContractScreen";
import styles from "./InternContractStatus.module.css";
import {
  CheckCircleOutline,
  HighlightOff,
  ErrorOutline,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { useNavigate } from "react-router-dom";

type internEmailProps = {
  email: string;
};

const InternContractStatus = (email: internEmailProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<infoType>();

  useEffect(() => {
    if (user) {
    }
    getUser();
  }, []);

  const getUser = async () => {
    if (email) {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/info/${email.email}`
        );
        setUserInfo(data.info);
        console.log(data.info);
        return;
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* const getClassByStatus = () => {
    userInfo!.status === "Ativo";
  }; */

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.card_title}>Contrato</div>
        <div className={styles.card_tags}>
          <div
            className={
              userInfo?.status === "Ativo"
                ? styles.card_active_tag
                : styles.card_standard_tag
            }
          >
            <CheckCircleOutline /> Ativo
          </div>
          <div
            className={
              userInfo?.status === "Pendente"
                ? styles.card_pending_tag
                : styles.card_standard_tag
            }
          >
            <ErrorOutline /> Pendente
          </div>
          <div
            className={
              userInfo?.status === "Encerrado"
                ? styles.card_inactive_tag
                : styles.card_standard_tag
            }
          >
            <HighlightOff /> Encerrado
          </div>
        </div>
        <ButtonWithIcon
          icon={<ArrowForwardIosRounded />}
          position="right"
          size="block"
          text="Ver detalhes"
          type="secondary"
          width={315}
          onClick={() => {
            navigate(`/dashboard/contrato/${email.email}`);
          }}
        />
      </div>
    </div>
  );
};

export default InternContractStatus;
