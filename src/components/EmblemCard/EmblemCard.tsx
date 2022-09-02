import React, { useEffect, useState } from "react";
import style from "./EmblemCard.module.css";
import Images from "../../assets";

import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

type EmblemCardProps = {
  title?: string;
  content: string;
  badge:
    | "Academy"
    | "AcademyHat"
    | "Design"
    | "Engineering"
    | "Goals"
    | "Product"
    | "TimeRegister"
    | "Welcome";
  onClickCollect?: () => void;
  id?: "outside";
};

const EmblemCard = ({
  title = "Parabéns!",
  content,
  badge,
  id = "outside",
  onClickCollect = () => {},
}: EmblemCardProps) => {
  const [loadingGif, setLoadingGif] = useState(true);

  useEffect(() => {
    setLoadingGif(true);
    setTimeout(() => {
      setLoadingGif(false);
    }, 1210);
  }, []);

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id && loadingGif === false) {
      onClickCollect();
    }
  };

  return (
    <div className={style.container} id={id} onClick={handleOutsideClick}>
      {loadingGif ? (
        <div>
          <img src={Images.starsGif} alt="Gif de estrelas" />
        </div>
      ) : (
        <div className={style.inner_card}>
          <div className={style.content_box}>
            <div className={style.badge}>
              <img src={Images.badge[badge]} alt={`Emblema de ${badge}`} />
            </div>
            <div className={style.title_content}>
              <h1>{title}</h1>
              <p>{content}</p>
            </div>
          </div>
          <ButtonWithIcon
            type="primary"
            size="small"
            text="Coletar"
            icon={<ArrowForwardRoundedIcon />}
            width={148}
            position="right"
            onClick={onClickCollect}
          />
        </div>
      )}
    </div>
  );
};

export default EmblemCard;

/* 
------------------------COMO USAR------------------------

 -> Declarar um useState com variável boolean que alterará caso o card estiver aberto. Ex.:
      const [emblemCardOpen, setEmblemCardOpen] = useState(false);

-> setState(true) na função que deverá abrir o card. Ex.:
        onClick={() => setEmblemCardOpen(true)}

-> Renderizar o componente caso state. 
    Obs.: Lembrar de setState(false) na função passada para o onClickCollect;
    Ex.:
            {emblemCardOpen && (
               <EmblemCard
                 title="Parabéns!"
                 content="Você concluiu um curso da Trilha Design e merece um emblema!"
                 badge="Design"
                 onClickCollect={() => setEmblemCardOpen(false)}
                />
            )}

---------------------------------------------------------
*/
