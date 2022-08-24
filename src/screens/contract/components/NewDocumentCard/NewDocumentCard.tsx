import React from "react";
import styles from "./NewDocumentCard.module.css";
import { UploadFileOutlined, FileUploadOutlined } from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import { useDropzone, FileWithPath } from "react-dropzone";


const NewDocumentCard = (props: any) => {
  const iconUpload = <FileUploadOutlined />;
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });
  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} {/* - {file.size} bytes */}
    </li>
  ));
  
  return (
    <div className={styles.card_container}>
      <div {...getRootProps(/* { className: "dropzone" } */)}>
        <input {...getInputProps()} />
        <div className={styles.card_inner_container}>
          <div className={styles.inner_container}>
            <UploadFileOutlined fontSize="large" />
          </div>
          <span>Novo documento</span>
          <p>Selecione ou arraste e solte o seu arquivo</p>
          <ButtonWithIcon
            onClick={open}
            type={"primary"}
            size={"small"}
            text={"Adicionar"}
            icon={iconUpload}
            position={"left"}
            width={164}
          />
        </div>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </div>
  );
};

export default NewDocumentCard;
