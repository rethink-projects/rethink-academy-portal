import React from "react";
import styles from "./NewDocumentCard.module.css";
import { UploadFileOutlined, FileUploadOutlined } from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";

const NewDocumentCard = () => {
  const iconUpload = <FileUploadOutlined />;
  return (
    <div className={styles.card_container}>
      <div className={styles.card_inner_container}>
        <div className={styles.inner_container}>
          <UploadFileOutlined fontSize="large" />
        </div>
        <span>Novo documento</span>
        <p>Selecione ou arraste e solte o seu arquivo</p>
        <ButtonWithIcon
          type={"primary"}
          size={"small"}
          text={"Adicionar"}
          icon={iconUpload}
          position={"left"}
          width={164}
        />
      </div>
    </div>
  );
};

export default NewDocumentCard;
