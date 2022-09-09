import React, { useCallback, useEffect } from "react";
import styles from "./NewDocumentCard.module.css";
import { UploadFileOutlined, FileUploadOutlined } from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useStorage } from "../../../../services/supabase/storage";
import { useNotification } from "../../../../context/NotificationContext";
import { fileType } from "../DocumentCard/DocumentCard";

const NewDocumentCard = ({ setFiles }: { setFiles: (value: any) => void }) => {
  const iconUpload = <FileUploadOutlined />;
  const { initStorage, uploadFile, generateUrlToDownload, url } = useStorage();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const { notify } = useNotification();
  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} {/* - {file.size} bytes */}
    </li>
  ));

  const handleInitStorage = useCallback(async () => {
    await initStorage();
  }, [initStorage]);

  useEffect(() => {
    handleInitStorage();
  }, [handleInitStorage]);

  const handleUploadFile = async () => {
    const file = acceptedFiles[0];
    setFiles((prevValue: any[]) =>
      //prevValue.push({ title: file.name, id: file.name, url: file.name })

      {
        console.log("PREV VALUE", prevValue);
        prevValue.push({
          title: file.name,
          id: file.name,
          url: file.name,
          userId: "d5c75974-403b-461e-9cab-03faec0f3a86",
        });
        return prevValue;
      }
    );
    if (file) {
      await uploadFile(file.name, acceptedFiles[0], file.name);
    } else {
      notify({
        type: "error",
        title: "Você ainda não selecionou um arquivo",
      });
    }
    acceptedFiles.pop();
    window.location.reload();
  };

  return (
    <div className={styles.card_container}>
      <div className={styles.card_inner_container}>
        <div className={styles.inner_container}>
          <UploadFileOutlined fontSize="large" />
        </div>
        <span>Novo documento</span>
        {!acceptedFiles[0] ? (
          <p>Selecione ou arraste e solte o seu arquivo</p>
        ) : (
          acceptedFiles.map((file: FileWithPath) => (
            <p key={file.path}>{file.path}</p>
          ))
        )}
        <div className={styles.container_button}>
          {!acceptedFiles[0] ? (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <ButtonWithIcon
                onClick={() => {}}
                type={"primary"}
                size={"small"}
                text={"Adicionar"}
                icon={iconUpload}
                position={"left"}
                width={164}
              />
            </div>
          ) : (
            <ButtonWithIcon
              onClick={handleUploadFile}
              type={"primary"}
              size={"small"}
              text={"Confirmar"}
              icon={iconUpload}
              position={"left"}
              width={164}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewDocumentCard;
