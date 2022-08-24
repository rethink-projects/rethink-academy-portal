import React from "react";
import styles from "./DocumentCard.module.css";
import {
  FileOpenOutlined,
  FileDownloadOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";

type DocumentProps = {
  id: string;
  name: string;
};

type CardType = {
  type: "embassador" | "student";
};

export const documentsList: DocumentProps[] = [
  {
    id: "1",
    name: "Atestado_de_matricula.pdf",
  },
  {
    id: "2",
    name: "Contrato_dos_equipamentos.pdf",
  },
  {
    id: "3",
    name: "Termo_de_estagio.pdf",
  },
];

const DocumentCard = (documentContent: DocumentProps & CardType) => {
  const iconDownload = <FileDownloadOutlined />;
  const iconDelete = <DeleteOutline />;
  return documentContent.type === "student" ? (
    <div className={styles.card_container}>
      <div className={styles.card_container_inner}>
        <div className={styles.card_info}>
          <FileOpenOutlined fontSize="large" color="action" />
          <p>{documentContent.name}</p>
        </div>
        <div className={styles.card_buttons}>
          <ButtonWithIcon
            type={"secondary"}
            size={"small"}
            text={"Download"}
            icon={iconDownload}
            position={"left"}
            width={164}
          />
          <ButtonWithIcon
            type={"outline"}
            size={"small"}
            text={"Excluir"}
            icon={iconDelete}
            position={"left"}
            width={164}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.card_container_embassador}>
      <div className={styles.card_container_inner_embassador}>
        <div className={styles.card_info}>
          <FileOpenOutlined fontSize="large" color="action" />
          <p>{documentContent.name}</p>
        </div>
        <div className={styles.card_buttons}>
          <ButtonWithIcon
            type={"secondary"}
            size={"small"}
            text={"Download"}
            icon={iconDownload}
            position={"left"}
            width={164}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
