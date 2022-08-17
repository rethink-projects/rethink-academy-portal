import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext";
import styles from "./EvaluationScreen.module.css";

const EvaluationScreen = () => {
  const { user } = useAuth();

  //   if (user.role != embassador) {
  //     return <div>Não tem permissão para acessar esta pagina</div>;
  //   }  //caso o usuario não for embaixador

  // console.log(user);

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
          <p>Aqui você consegue postar e editar as avaliações mensais de cada estagiário.</p>
        </div>
        <div className={styles.evaluationScreen_dropdown}>
          <Dropdown setValue={()=>{}}  options={["março","abril","maio"]} id={"1"} initialText={"Mês"}/>
        </div>
      </div>

      <div className={styles.evaluationScreen_table_container}>
          
      </div>
    </div>
  );
};

export default EvaluationScreen;
