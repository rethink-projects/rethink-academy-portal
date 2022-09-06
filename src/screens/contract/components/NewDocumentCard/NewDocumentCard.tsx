import React, { useCallback, useEffect } from "react";
import styles from "./NewDocumentCard.module.css";
import { UploadFileOutlined, FileUploadOutlined } from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useStorage } from "../../../../services/supabase/storage";
import { useNotification } from "../../../../context/NotificationContext";

const NewDocumentCard = (props: any) => {
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
    if (file) {
      await uploadFile(file.name, acceptedFiles[0], "contrato");
    } else {
      notify({
        type: "error",
        title: "Você ainda não selecionou um arquivo",
      });
    }
    acceptedFiles.pop();
  };

  return (
    <div className={styles.card_container}>
      {/* <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} /> */}
      <div className={styles.card_inner_container}>
        <div className={styles.inner_container}>
          <UploadFileOutlined fontSize="large" />
        </div>
        <span>Novo documento</span>
        <p>Selecione ou arraste e solte o seu arquivo</p>
        {!acceptedFiles[0] ? (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <ButtonWithIcon
              onClick={acceptedFiles[0] ? handleUploadFile : () => {}}
              type={"primary"}
              size={"small"}
              text={acceptedFiles[0] ? "Confirmar" : "Adicionar"}
              icon={iconUpload}
              position={"left"}
              width={164}
            />
            {/* <Button variant="outlined" type="button" onClick={handleUploadFile}>
              {acceptedFiles[0] ? "Confirmar" : "Selecione um arquivo"}
            </Button> */}
          </div>
        ) : (
          <ButtonWithIcon
            onClick={acceptedFiles[0] ? handleUploadFile : () => {}}
            type={"primary"}
            size={"small"}
            text={acceptedFiles[0] ? "Confirmar" : "Adicionar"}
            icon={iconUpload}
            position={"left"}
            width={164}
          />
        )}
      </div>
    </div>
    /* </div> */
  );
};

export default NewDocumentCard;
