import { useState } from "react";

import style from "./CategoryTag.module.css";

import Images from "../../../../../../assets";

type categoryTagProps = {
  type: "Hard Skills" | "Soft Skills" | "Desenvolvimento Pessoal";
};

const CategoryTag = ({ type }: categoryTagProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <button
      className={`${style.default} ${isActive ? style.active : ""} `}
      onClick={handleClick}
    >
      {type === "Desenvolvimento Pessoal" ? (
        <img src={Images.desenvolvimentoPessoal} />
      ) : type === "Hard Skills" ? (
        <img src={Images.academyHat} />
      ) : (
        <img src={Images.lamp} />
      )}
      {type}
    </button>
  );
};

export default CategoryTag;
