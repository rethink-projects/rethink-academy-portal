import React, { useEffect, useState } from "react";
import styles from "./EvaluationTag.module.css";

const EvaluationTag = ({
  tagType,
  setTagType,
}: {
  tagType: "ENGINEERING" | "DESIGN" | "PRODUCT";
  setTagType: (value: "ENGINEERING" | "DESIGN" | "PRODUCT") => void;
}) => {
  // variaveis para controlar estado das tags ativo e inativo
  const [activeDesign, setActiveDesign] = useState(false);
  const [activeEngenharia, setActiveEngenharia] = useState(true);
  const [activeProduto, setActiveProduto] = useState(false);

  const activeClassDesign = activeDesign ? styles.tag_button_active : "";
  const activeClassEngenharia = activeEngenharia
    ? styles.tag_button_active
    : "";
  const activeClassProduto = activeProduto ? styles.tag_button_active : "";

  const handleClick = (id: "ENGINEERING" | "DESIGN" | "PRODUCT") => {
    setTagType(id);
    if (id === "DESIGN") {
      setActiveDesign(true);
      setActiveEngenharia(false);
      setActiveProduto(false);
    } else if (id === "ENGINEERING") {
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
        onClick={() => handleClick("DESIGN")}
      >
        Design
      </button>
      <button
        className={[styles.tag_button, activeClassEngenharia].join(" ")}
        onClick={() => handleClick("ENGINEERING")}
      >
        Engenharia
      </button>
      <button
        className={[styles.tag_button, activeClassProduto].join(" ")}
        onClick={() => handleClick("PRODUCT")}
      >
        Produto
      </button>
    </div>
  );
};

export default EvaluationTag;
