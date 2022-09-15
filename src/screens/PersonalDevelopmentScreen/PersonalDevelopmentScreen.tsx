import React, { useState } from "react";

import CardMetas from "../../components/CardMetas/CardMetas";
import CardNotas from "./components/CardNotas/CardNotas";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import PersonalDevelopmentChart from "../../components/SkillChart/PersonalDevelopmentChart";
import Spinner from "../../components/Spinner/Spinner";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import style from "./PersonalDevelopmentScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PersonalDevelopmentScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    if (user.role === "STUDENT") {
      return (
        <div className={style.screenInner}>
          <div className={style.titlesContainer}>
            <div className={style.breadcrumbs}>
              <BreadCrumb
                breadcrumbItems={[
                  { title: "Home", link: "/" },
                  {
                    title: "Seu Desenvolvimento",
                    link: "/desenvolvimentoPessoal",
                  },
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
                      navigate("/dashboard/notas");
                    }}
                  >
                    Ver mais <ArrowForwardOutlinedIcon />
                  </button>
                </div>

                <CardNotas />
              </div>
              <div className={style.metasContainer}>
                <h2>Metas</h2>
                <CardMetas studentEmail="amanda.duarte@rethink.dev" />
              </div>
            </div>
            <div className={style.bottomCardContainer}>
              <div className={style.bottomCardTitles}>
                <h2>Evolução de Habilidades</h2>
              </div>
              <div className={style.bottomChart}>
                <PersonalDevelopmentChart />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.personalDevelopment_loading}>
          Você não tem permissão para acessar essa página.
        </div>
      );
    }
  }
  return (
    <div className={style.personalDevelopment_loading}>
      <Spinner type="light" size="big" isLoading={true} />
    </div>
  );
};

export default PersonalDevelopmentScreen;
