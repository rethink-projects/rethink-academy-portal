import React, { useState } from "react";
import ModalLateral from "./components/modalLateral/ModalLateral";
import CardMetas from "../../components/CardMetas/CardMetas";
import CardNotas from "./components/CardNotas/CardNotas";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import Switch from "../notes/components/Switch/Switch";

import SchoolIcon from "@mui/icons-material/School";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import style from "./PersonalDevelopmentScreen.module.css";
import { useNavigate } from "react-router-dom";

const PersonalDevelopmentScreen = () => {
  const navigate = useNavigate();

  return (
    <div className={style.screenInner}>
      <div className={style.titlesContainer}>
        <div className={style.breadcrumbs}>
          <BreadCrumb
            breadcrumbItems={[
              { title: "Home", link: "/" },
              { title: "Seu Desenvolvimento", link: "/desenvolvimentoPessoal" },
            ]}
          />
        </div>
        <h1>Seu Desenvolvimento</h1>
      </div>
      <div className={style.cardsContainer}>
        <div className={style.topCardsContainer}>
          <div className={style.metasContainer}>
            <div className={style.notesTitles}>
              <h2>Suas anotações</h2>
              <button
                onClick={() => {
                  navigate("/notas");
                }}
              >
                Ver mais <ArrowForwardOutlinedIcon />
              </button>
            </div>

            <CardNotas />
          </div>
          <div className={style.metasContainer}>
            <h2>Metas</h2>
            <CardMetas />
          </div>
        </div>
        <div className={style.bottomCardContainer}>
          <div className={style.bottomCardTitles}>
            <h2>Evolução de Habilidades</h2>
            <div className={style.switch}>
              <Switch
                itemLeft={{ title: "Hard Skills", icon: <SchoolIcon /> }}
                itemRight={{
                  title: "Soft Skills",
                  icon: <EmojiObjectsOutlinedIcon />,
                }}
              />
            </div>
          </div>
          <div className={style.bottomCard_PLACEHOLDER}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDevelopmentScreen;
