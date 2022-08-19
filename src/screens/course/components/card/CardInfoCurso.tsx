import { AccessTime } from "@mui/icons-material";
import Images from "../../../../assets";
import Avatar from "../../../../components/Avatar/Avatar";
import Badge from "../../../../components/Badge/Badge";
import styles from "./CardInfoCurso.module.css";

type CardInfoProps = {
  level: "Iniciante" | "Intermediário" | "Avançado";
  // na primeira posição do vetor voce envia o numero de modulos, na segunda posição voce envia o numero de aulas
  module_class: { module: number; class: number };
  author: string;
  authorDescription: string;
  learn: string[];
  skills: string[];
  avatar: string;
};

const CardInfoCurso = ({
  level,
  module_class,
  author,
  authorDescription,
  learn,
  skills,
  avatar,
}: CardInfoProps) => {
  return (
    <div className={styles.card_container}>
      <h1 className={styles.title}>Informações Práticas</h1>
      <div className={styles.practical_information}>
        <div className={styles.info_nivel}>
          <Badge
            icon={
              level === "Iniciante" ? (
                <img src={Images.icons.weakBatery} />
              ) : level === "Intermediário" ? (
                <img src={Images.icons.averageBatery} />
              ) : (
                <img src={Images.icons.fullBatery} />
              )
            }
            color="dark"
            size="large"
          />
          <h1 className={styles.title}>Nível {level}</h1>
        </div>
        <div className={styles.info_nivel}>
          <Badge icon={<AccessTime />} size="large" color="dark" />
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
          <Avatar type="image" children={<img src={avatar} />} size="large" />
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
            learn.map((title, index) => (
              <li key={index}>
                <p>{title}</p>
              </li>
            ))}
        </ul>
      </div>
      <h1 className={`${styles.title} ${styles.title_space}`}>
        Habilidades que você terá:
      </h1>
      <div>
        <ul className={styles.list}>
          {!!skills.length &&
            skills.map((title, index) => (
              <li key={index}>
                <p>{title}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CardInfoCurso;
