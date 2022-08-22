import React, { useEffect, useState } from "react";
import { evaluationUserType } from "../../EvaluationScreen";
import styles from "./EvaluationTag.module.css";

const EvaluationTag = ({
  tagType,
  setTagType,
}: {
  tagType: string;
  setTagType: (value: string) => void;
}) => {
  // variaveis para controlar estado das tags ativo e inativo
  const [activeDesign, setActiveDesign] = useState(true);
  const [activeEngenharia, setActiveEngenharia] = useState(false);
  const [activeProduto, setActiveProduto] = useState(false);

  const activeClassDesign = activeDesign ? styles.tag_button_active : "";
  const activeClassEngenharia = activeEngenharia
    ? styles.tag_button_active
    : "";
  const activeClassProduto = activeProduto ? styles.tag_button_active : "";

  // estado default do retorno iniciado como "design", so é ativado quando a pagina renderiza
  useEffect(() => {
    setTagType("design");
  }, []);

  const handleClick = (id: string) => {
    setTagType(id);
    if (id === "design") {
      setActiveDesign(true);
      setActiveEngenharia(false);
      setActiveProduto(false);
    } else if (id === "engenharia") {
      setActiveDesign(false);
      setActiveEngenharia(true);
      setActiveProduto(false);
    } else {
      setActiveDesign(false);
      setActiveEngenharia(false);
      setActiveProduto(true);
    }
  };

  return (
    <div className={styles.tag_container}>
      <button
        className={[styles.tag_button, activeClassDesign].join(" ")}
        onClick={() => handleClick("design")}
      >
        Design
      </button>
      <button
        className={[styles.tag_button, activeClassEngenharia].join(" ")}
        onClick={() => handleClick("engenharia")}
      >
        Engenharia
      </button>
      <button
        className={[styles.tag_button, activeClassProduto].join(" ")}
        onClick={() => handleClick("produto")}
      >
        Produto
      </button>
    </div>
  );
};

export default EvaluationTag;
