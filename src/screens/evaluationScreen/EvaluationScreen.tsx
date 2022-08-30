import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

// components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import EvaluationDatePicker from "./components/evaluationDatePicker/EvaluationDatePicker";
import EvaluationSwitch from "./components/evaluationSwitch/EvaluationSwitch";
import EvaluationTag from "./components/tags/EvaluationTag";

// style
import styles from "./EvaluationScreen.module.css";
import BasicEditingGrid from "./components/evalutionTable/EvaluationTable";
import axios from "axios";

// type getUserType = {

// }

const EvaluationScreen = () => {
  const { user } = useAuth();

  const [userByEmail, setUserByEmail] = useState({});

  // const getUser = async (email: string) => {
  //   try {
  //     const userData = await axios.get(
  //       `http://localhost:4000/api/user/${email}`
  //     );
  //     setUserByEmail(userData.data);
  //     return;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if(userByEmail.role ===)

  const [skillType, setSkillType] = useState(true);

  const [tagType, setTagType] = useState<"ENGINEERING" | "DESIGN" | "PRODUCT">(
    "DESIGN"
  );

  const data = new Date().toString();
  let dataSplit = data?.split(" ");
  const returnData = dataSplit ? dataSplit[1].concat(" ", dataSplit[3]) : "";

  const [month, setMonth] = useState(returnData);

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
              Aqui você consegue postar e editar as avaliações mensais de cada
              estagiário.
            </p>
          </div>
          <div className={styles.evaluationScreen_dropdown}>
            <EvaluationDatePicker month={month} setMonth={setMonth} />
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
          <div className={styles.evaluationScreen_table}>
            <BasicEditingGrid role={tagType} skill={skillType} month={month} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationScreen;
