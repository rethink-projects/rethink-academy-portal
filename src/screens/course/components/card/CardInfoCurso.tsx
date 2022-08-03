import { AccessTime } from "@mui/icons-material";
import { useAuth } from "../../../../context/AuthContext";
import userEvent from "@testing-library/user-event";
import React from "react";
import Images from "../../../../assets";
import Avatar from "../../../../components/Avatar/Avatar";
import Badge from "../../../../components/Badge/Badge";
import styles from "./CardInfoCurso.module.css";

const CardInfoCurso = () => {
  // const { user } = useAuth();
  // console.log(user);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  // return <div>{user.email}</div>;

  return (
    <div className={styles.card_container}>
      <h1 className={styles.title}>Informações Práticas</h1>
      <div className={styles.informacoes_praticas}>
        <div className={styles.info_nivel}>
          <Badge
            icon={<img src={Images.icons.Batery} />}
            color="secondary"
            size="large"
          />
          <h1 className={styles.title}>Nível iniciante</h1>
        </div>
        <div className={styles.info_nivel}>
          <Badge icon={<AccessTime />} size="large" />
          <div className={styles.info_description}>
            <h1 className={styles.title}>Carga horária: 120h</h1>
            <p>8 Módulos e 35 Aulas</p>
          </div>
        </div>
        <div className={styles.info_nivel}>
          <Avatar type="image" children={<AccessTime />} size="large" />
          {/* <img src={user.avatarUrl} alt="avatar do user" /> */}
          <div className={styles.info_description}>
            <h1 className={styles.title}>Marcela Monteiro</h1>
            <p>Diretora de arte e designer gráfica</p>
          </div>
        </div>
      </div>
      <h1 className={styles.title}>O que você vai aprender neste curso:</h1>
      <div className={styles.topicos}>
        <ul>
          <li>
            <p>Metodologia Double Diamond</p>
          </li>
          <li>
            <p>O papel dos Testes de Usabilidade</p>
          </li>
          <li>
            <p>Ferramentas de prototipação</p>
          </li>
          <li>
            <p>Documentação de processos</p>
          </li>
        </ul>
      </div>
      <h1 className={styles.title}>Habilidades que você terá:</h1>
      <div>
        <ul>
          <li>
            <p>Produzir e aplicar um Teste de Usabilidade</p>
          </li>
          <li>
            <p>Desenvolver protótipos de baixa fidelidade</p>
          </li>
          <li>
            <p>Produzir workshops utilizando ferramentas de co-criação</p>
          </li>
          <li>
            <p>Preparar um Hand-off</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardInfoCurso;
