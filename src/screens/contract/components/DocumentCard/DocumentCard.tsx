import React, { useState } from "react";
import styles from "./DocumentCard.module.css";
import {
  FileOpenOutlined,
  FileDownloadOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import { useStorage } from "../../../../services/supabase/storage";
import axios from "axios";

type CardType = {
  type: "embassador" | "student";
};

export type fileType = {
  title: string;
  url: string;
  id: string;
  isDeleted: string;
  setIsDeleted: (value: string) => void;
};

const DocumentCard = (documentContent: fileType & CardType) => {
  const { generateUrlToDownload, url } = useStorage();
  const iconDownload = <FileDownloadOutlined />;
  const iconDelete = <DeleteOutline />;

  const handleDownloadUrl = async (url: string) => {
    await generateUrlToDownload(documentContent.url);
  };

  const deleteFile = async (id: string) => {
    await axios.delete(`http://localhost:4000/api/bucket/${id}`);
    documentContent.setIsDeleted(id);
  };

  return documentContent.type === "student" ? (
    <div className={styles.card_container}>
      <div className={styles.card_container_inner}>
        <div className={styles.card_info}>
          <FileOpenOutlined fontSize="large" color="action" />
          <p>
            {documentContent.title.length > 34
              ? documentContent.title.slice(0, 34) + "..."
              : documentContent.title}
          </p>
        </div>
        <div className={styles.card_buttons}>
          <ButtonWithIcon
            onClick={() => handleDownloadUrl(url!)}
            type={"secondary"}
            size={"small"}
            text={"Download"}
            icon={iconDownload}
            position={"left"}
            width={164}
          />
          <ButtonWithIcon
            onClick={() => deleteFile(documentContent.id)}
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
          <p>{documentContent.title}</p>
        </div>
        <div className={styles.card_buttons}>
          <ButtonWithIcon
            onClick={() => handleDownloadUrl(url!)}
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
