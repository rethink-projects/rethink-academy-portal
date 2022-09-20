import React, { useEffect, useState } from "react";
import styles from "./Tag.module.css";

export const headers = {
  ENGINEERING: [
    "BackEnd",
    "FrontEnd",
    "HTML e CSS",
    "React",
    "JavaScript",
    "TypeScript",
  ],
  DESIGN: [
    "Pesquisas",
    "Facilitação de Workshop",
    "Wireframe e Fluxo",
    "Design system",
    "Product Design",
    "Padronização e ",
  ],
  PRODUCT: [
    "Produto",
    "Pessoas",
    "Processos",
    "Estratégia",
    "Performance",
    "Evolução",
  ],
  SOFT: [
    "Empatia",
    "Resolução de Problemas",
    "Comunicação",
    "Inteligencia emocial",
    "Autoconfiança",
    "Gestão de tempo",
  ],
};

const EvaluationTag = ({
  tagType,
  setSkill,
  skill,
}: {
  tagType: "ENGINEERING" | "DESIGN" | "PRODUCT" | "SOFT";
  setSkill: (value: string) => void;
  skill: string;
}) => {
  // variaveis para controlar estado das tags ativo e inativo

  const [header, setHeader] = useState<
    "ENGINEERING" | "DESIGN" | "PRODUCT" | "SOFT"
  >(tagType);

  useEffect(() => {
    setHeader(tagType);
  }, [tagType]);

  const handleClass = (buttonSkill: string) => {
    if (buttonSkill === skill) {
      return [styles.tag_button, styles.tag_button_active].join(" ");
    }
    return styles.tag_button;
  };

  return (
    <div className={styles.tag_container}>
      {headers[header].map((item, index) => (
        <button
          key={index}
          className={handleClass(item)}
          onClick={() => {
            setSkill(item);
            // setGraphData(getData);
          }}
        >
          {item.length < 15 ? item : item.slice(0, 15) + "..."}
        </button>
      ))}
    </div>
  );
};

export default EvaluationTag;
