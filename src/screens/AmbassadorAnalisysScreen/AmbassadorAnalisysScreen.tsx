import React, { useState, useEffect } from "react";
// Styles
import styles from "./AmbassadorAnalisysScreen.module.css";

// Components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

//Context
import { useAuth } from "../../context/AuthContext";
import AmbassadorViewTasksMM from "../../components/AmbassadorViewTasksMM/AmbassadorViewTasksMM";
import Register from "../../components/Register/Register";
import SelectionTeam from "../../components/SelectionTeam/SelectionTeam";
import { getUserFromBackend } from "../../services/backend/UserService";
import Toast from "../../components/Toast/Toast";

const InternAnalisysScreen = () => {
  type Intern = {
    id: string;
    email: string;
    name: string;
    surname: string;
  };

  const [intern, setIntern] = useState<Intern>();
  const [emailIntern, setEmailIntern] = useState("");
  const [isEqual, setIsEqual] = useState(true);
  const [name, setName] = useState("");

  const handleEmailIntern = (email: string) => {
    if (email === emailIntern) {
      setIsEqual(true);
    } else {
      setEmailIntern(email);
      setIsEqual(false);
    }
  };

  const getIntern = async () => {
    const data = await getUserFromBackend(emailIntern);
    setIntern(data);
    setName(data.name);
  };

  useEffect(() => {
    if (!isEqual) getIntern();
  }, [isEqual, emailIntern]);

  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.intern_container}>
      <div className={styles.intern_body}>
        <Breadcrumb
          breadcrumbItems={[
            { title: "Home", link: "/dashboard" },
            { title: "Registro de Horas", link: "/dashboard/register" },
            {
              title: "Análise de Tarefas",
              link: "/dashboard/register/analysis/intern",
            },
            { title: name, link: "" },
          ]}
        />
        <SelectionTeam internSelected={handleEmailIntern} />
        <div className={styles.intern_graph}></div>
        <div className={styles.intern_data}>
          <div className={styles.intern_data_historic}>
            <h1>Histórico de atividades</h1>
            {intern ? (
              <AmbassadorViewTasksMM email={intern.email} />
            ) : (
              <div className={styles.error}>
                <Toast
                  title="Selecione um estagiário para visualizar o histórico de atividades"
                  type="info"
                />
              </div>
            )}
          </div>
          <div className={styles.intern_data_viewFast}>
            <h1>Visualização Rápida</h1>
            {intern ? (
              <Register type="intern" email={intern.email} />
            ) : (
              <div className={styles.fastView}>
                <Toast
                  title="Selecione um estagiário para visualizar suas atividades"
                  type="info"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.intern_comment}></div>
    </div>
  );
};

export default InternAnalisysScreen;
