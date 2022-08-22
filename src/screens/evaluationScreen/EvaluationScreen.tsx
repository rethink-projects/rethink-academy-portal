import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext";
import EvaluationSwitch from "./components/evaluationSwitch/EvaluationSwitch";
import EvaluationTag from "./components/tags/EvaluationTag";
import styles from "./EvaluationScreen.module.css";

export type evaluationUserType = {
  userName: string;
  userSurname: string;
  role: string;
  month: string;
  skills: string;
  evaluation: evaluationType[];
};

type evaluationType = {
  title: string;
  grade: number;
};

const EvaluationScreen = () => {
  const { user } = useAuth();

  const evaluationsData = [
    {
      userName: "Felipe",
      userSurname: "Reggiane",
      role: "Engenharia",
      month: "março",
      skills: "hardSkills",
      evaluation: [
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
      ],
    },
    {
      userName: "Marcela",
      userSurname: "Monteiro",
      role: "Produto",
      month: "abril",
      skills: "hardSkills",
      evaluation: [
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
      ],
    },
    {
      userName: "Pedro",
      userSurname: "Lucas",
      role: "Design",
      month: "maio",
      skills: "hardSkills",
      evaluation: [
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
        {
          title: "Produto",
          grade: 5,
        },
      ],
    },
  ];

  const [evaluations, setEvaluations] =
    useState<evaluationUserType[]>(evaluationsData);

  //   if (user.role != embassador) {
  //     return <div>Não tem permissão para acessar esta pagina</div>;
  //   }  //caso o usuario não for embaixador

  // console.log(user);

  // true == hardSkills ### false == softSkills
  const [skillType, setSkillType] = useState(true);
  // console.log(skillType);

  const [tagType, setTagType] = useState("");
  console.log(tagType);

  return (
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
            Aqui você consegue postar e editar as avaliações mensais de cada
            estagiário.
          </p>
        </div>
        <div className={styles.evaluationScreen_dropdown}>
          <Dropdown
            setValue={() => {}}
            options={["março", "abril", "maio", "junho"]}
            id={"1"}
            initialText={"Mês"}
          />
        </div>
      </div>

      <div className={styles.evaluationScreen_table_container}>
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
      </div>
    </div>
  );
};

export default EvaluationScreen;
