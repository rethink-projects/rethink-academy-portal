import { AccessTime } from "@mui/icons-material";
import Images from "../../../../assets";
import Avatar from "../../../../components/Avatar/Avatar";
import Badge from "../../../../components/Badge/Badge";
import styles from "./CardInfoCurso.module.css";

type CardInfoProps = {
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  // na primeira posição do vetor voce envia o numero de modulos, na segunda posição voce envia o numero de aulas
  module_class: { module: number; class: number };
  author: string;
  authorDescription: string;
  learn: string[];
  skills: string[];
};

const CardInfoCurso = ({
  nivel,
  module_class,
  author,
  authorDescription,
  learn,
  skills,
}: CardInfoProps) => {
  return (
    <div className={styles.card_container}>
      <h1 className={styles.title}>Informações Práticas</h1>
      <div className={styles.informacoes_praticas}>
        <div className={styles.info_nivel}>
          <Badge
            icon={
              nivel === "Iniciante" ? (
                <img src={Images.icons.weakBatery} />
              ) : nivel === "Intermediário" ? (
                <img src={Images.icons.averageBatery} />
              ) : (
                <img src={Images.icons.fullBatery} />
              )
            }
            color="secondary"
            size="large"
          />
          <h1 className={styles.title}>Nível {nivel}</h1>
        </div>
        <div className={styles.info_nivel}>
          <Badge icon={<AccessTime />} size="large" />
          <div className={styles.info_description}>
            <h1 className={`${styles.title} ${styles.title_space}`}>
              Carga horária: 120h
            </h1>
            <p>
              {module_class.module} Módulos e {module_class.class} Aulas
            </p>
          </div>
        </div>
        <div className={styles.info_nivel}>
          <Avatar
            type="image"
            children={
              <img src="https://st.depositphotos.com/1010338/2099/i/600/depositphotos_20999947-stock-photo-tropical-island-with-palms.jpg" />
            }
            size="large"
          />
          <div className={styles.info_description}>
            <h1 className={`${styles.title} ${styles.title_space}`}>
              {author}
            </h1>
            <p>{authorDescription}</p>
          </div>
        </div>
      </div>
      <h1 className={`${styles.title} ${styles.title_space}`}>
        O que você vai aprender neste curso:
      </h1>
      <div className={styles.topicos}>
        <ul className={styles.list}>
          {!!learn.length &&
            learn.map((title) => (
              <li>
                <p>{title}</p>
              </li>
            ))}
          {/* <li>
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
          </li> */}
        </ul>
      </div>
      <h1 className={`${styles.title} ${styles.title_space}`}>
        Habilidades que você terá:
      </h1>
      <div>
        <ul className={styles.list}>
          {!!skills.length &&
            skills.map((title) => (
              <li>
                <p>{title}</p>
              </li>
            ))}
          {/* <li>
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
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default CardInfoCurso;
