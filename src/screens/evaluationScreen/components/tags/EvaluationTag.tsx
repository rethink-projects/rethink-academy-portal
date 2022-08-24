import React, { useEffect, useState } from "react";
import styles from "./EvaluationTag.module.css";

const EvaluationTag = ({
  tagType,
  setTagType,
}: {
  tagType: "engineering" | "design" | "product";
  setTagType: (value: "engineering" | "design" | "product") => void;
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

  const handleClick = (id: "engineering" | "design" | "product") => {
    setTagType(id);
    if (id === "design") {
      setActiveDesign(true);
      setActiveEngenharia(false);
      setActiveProduto(false);
    } else if (id === "engineering") {
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
        onClick={() => handleClick("engineering")}
      >
        Engenharia
      </button>
      <button
        className={[styles.tag_button, activeClassProduto].join(" ")}
        onClick={() => handleClick("product")}
      >
        Produto
      </button>
    </div>
  );
};

export default EvaluationTag;
