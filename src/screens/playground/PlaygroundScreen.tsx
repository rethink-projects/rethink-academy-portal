/* eslint-disable no-sequences */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../services/supabase/storage";

import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const { user } = useAuth();
  const { initStorage, uploadFile, generateUrlToDownload, url } = useStorage();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

  const handleInitStorage = useCallback(async () => {
    await initStorage();
  }, [initStorage]);

  useEffect(() => {
    handleInitStorage();
  }, [handleInitStorage]);

  const handleUploadFile = async () => {
    const file = acceptedFiles[0];
    await uploadFile(`/pasta-2/${file.name}`, acceptedFiles[0]);
  };

  const handleDownloadUrl = async () => {
    await generateUrlToDownload(`/pasta-2/contrato-rethink-academy.pdf`);
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <h1>Como usar o Storage do Supabase</h1>
        <br></br>
        <p></p>
        <p style={{ maxWidth: "600px", lineHeight: 1.5 }}>
          Ao acessar a tela <strong>PlaygroundScreen</strong> automaticamente
          será validado ou criado um bucket para
          <strong> {user.email}</strong> esse email será a referência no
          supabase.
        </p>
        <br></br>
        <p style={{ maxWidth: "600px", lineHeight: 1.5 }}>
          A Função <strong>initStorage()</strong> do hook
          <strong> useStorage()</strong> inicializa o storage do supabase
          validando se já existe algum bucket com o email do usuario logado.
        </p>
        <br />
        <br />
        <br />
        <h2>Upload</h2>
        <p style={{ maxWidth: "600px", lineHeight: 1.5 }}>
          Para fazer <strong>Upload</strong> de algum arquivo basta chamar a
          função <strong>uploadFile()</strong> <br />
          passando o caminho onde você quer salvar o arquivo. <br />
          <br />
          <span>
            Lembrando que supabase funciona de forma upInsert, ele verifica se
            já existe um folder <strong>contratos</strong> e o file com o nome
            passado, caso exista um arquivo com o mesmo nome ele apenas
            substitui.
          </span>
          <br />
          exemplo:
          <strong> "/{user.email}/contratos/nome-do-arquivo.pdf"</strong>
        </p>
        <br />
        <br />
        <pre>await uploadFile("/contratos/file.name", file);</pre>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant='outlined' type='button'>
              Selecione um arquivo
            </Button>
          </div>
          <Button variant='contained' onClick={handleUploadFile} type='button'>
            Fazer upload do arquivo
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <span>Arquivo Selecionado:</span>
          {acceptedFiles.map((file) => (
            <strong key={file.name}>{file.name}</strong>
          ))}
        </div>
        <br />

        <h2>Download de Arquivos</h2>
        <p style={{ maxWidth: "550px", lineHeight: 1.5 }}>
          Para fazer dispobilizar uma url para download, chame a função passando
          o caminho para o arquivo: <br />
          <br />
          <strong>generateUrlToDownload("contratos/nome-do-arquivo")</strong>
          <br />
          <Button variant='contained' onClick={handleDownloadUrl} type='button'>
            Generate URL
          </Button>
        </p>
        {url && (
          <iframe
            title='Unique'
            src={`${url}&embedded=true`}
            style={{ width: "800px", height: "500px", marginTop: "30px" }}
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default PlaygroundScreen;
