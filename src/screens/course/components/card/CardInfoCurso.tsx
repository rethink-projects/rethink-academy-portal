import { AccessTime } from "@mui/icons-material";
import { useEffect, useState } from "react";
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
  learn: string;
  skills: string;
  avatar: string;
  workload: number;
};

const CardInfoCurso = ({
  level,
  module_class,
  author,
  authorDescription,
  learn,
  skills,
  avatar,
  workload,
}: CardInfoProps) => {
  const makeImg = () => {
    const formatedAuthor = author.split(" ");
    if (formatedAuthor.length >= 2) {
      return `${formatedAuthor[0]}+${formatedAuthor[1]}`;
    }
    return formatedAuthor[0];
  };

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>();
  const urlCreatedImage = `https://ui-avatars.com/api/?name=${makeImg()}&rounded=true`;

  function checkImage(url: string) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      setIsImageLoaded(true);
    } else {
      img.onload = () => {
        setIsImageLoaded(true);
      };
      img.onerror = () => {
        setIsImageLoaded(false);
      };
    }
  }

  useEffect(() => {
    checkImage(avatar);
  }, []);

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
              {`Carga horária: ${workload}h`}
            </h1>
            <p>
              {module_class.module}{" "}
              {module_class.module === 1 ? "Módulo" : "Módulos"} e{" "}
              {module_class.class} {module_class.class === 1 ? "Aula" : "Aulas"}
            </p>
          </div>
        </div>
        <div className={styles.info_nivel}>
          <Avatar
            type="image"
            children={<img src={isImageLoaded ? avatar : urlCreatedImage} />}
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
      <div className={styles.learning_skills_container}>
        <h1 className={`${styles.title} ${styles.title_space}`}>
          O que você vai aprender neste curso:
        </h1>
        <p>{learn}</p>
      </div>
      <div className={styles.learning_skills_container}>
        <h1 className={`${styles.title} ${styles.title_space}`}>
          Habilidades que você terá:
        </h1>
        <p>{skills}</p>
      </div>
    </div>
  );
};

export default CardInfoCurso;
