import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import EvaluationDatePicker from "./components/evaluationDatePicker/EvaluationDatePicker";
import EvaluationSwitch from "./components/evaluationSwitch/EvaluationSwitch";
import EvaluationTag from "./components/tags/EvaluationTag";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// style
import styles from "./EvaluationScreen.module.css";
import BasicEditingGrid from "./components/evalutionTable/EvaluationTable";

import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

type getUserType = {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  main: string;
  profile: null;
  note: any;
  level: number;
  exp: number;
};

const EvaluationScreen = () => {
  const { user } = useAuth();

  const [skillType, setSkillType] = useState(true);

  const [tagType, setTagType] = useState<"ENGINEERING" | "DESIGN" | "PRODUCT">(
    "DESIGN"
  );

  const data = new Date().toString();
  let dataSplit = data?.split(" ");
  const returnData = dataSplit ? dataSplit[1].concat(" ", dataSplit[3]) : "";

  const [month, setMonth] = useState(returnData);

  if (user) {
    if (user.role === "AMBASSADOR") {
      return (
        <div className={styles.evaluationScreen_container_extern}>
          <div className={styles.evaluationScreen_container}>
            <div className={styles.evaluationScreen_breadcrumb}>
              <Breadcrumb
                breadcrumbItems={[
                  { title: "Home", link: "/" },
                  { title: "Avaliações", link: "/dashboard/avaliacao" },
                ]}
              />
            </div>

            <div className={styles.evaluationScreen_header}>
              <div className={styles.evaluationScreen_text}>
                <h1>Avaliações</h1>
                <p>
                  Aqui você consegue postar e editar as avaliações mensais de
                  cada estagiário.
                </p>
              </div>
              <div className={styles.evaluationScreen_dropdown}>
                <EvaluationDatePicker month={month} setMonth={setMonth} />
              </div>
            </div>

            <div className={styles.evaluationScreen_table_container}>
              <div className={styles.evaluationScreen_table_outside}>
                <div className={styles.evaluationScreen_table_actions}>
                  <div className={styles.evaluationScreen_table_switch}>
                    <EvaluationSwitch
                      skillType={skillType}
                      setSkillType={setSkillType}
                    />
                  </div>
                  <div className={styles.evaluationScreen_table_tags}>
                    <EvaluationTag tagType={tagType} setTagType={setTagType} />
                  </div>
                </div>
                <div className={styles.evaluationScreen_table_info}>
                  <InfoOutlinedIcon />
                  <p>
                    Dê dois cliques para habilitar a edição da nota e Enter para
                    salvar
                  </p>
                </div>
              </div>
              <div className={styles.evaluationScreen_table}>
                <BasicEditingGrid
                  role={tagType}
                  skill={skillType}
                  month={month}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.evaluationScreen_container_other}>
          <h1>Não tem permissão para acessar esta página</h1>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.evaluationScreen_container_other}>
        <Spinner type="light" size="big" isLoading={true} />
      </div>
    );
  }
};

export default EvaluationScreen;
