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
import Comment from "../../components/Comment/Comment";
import TagChart from "../../components/TagChart/TagChart";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/backend/Api";

const InternAnalisysScreen = () => {
  type Intern = {
    id: string;
    email: string;
    name: string;
    surname: string;
  };
  const location = useLocation();
  const [intern, setIntern] = useState<Intern>();
  const [emailIntern, setEmailIntern] = useState(
    location.pathname.split("/")[4]
  );
  const [isEqual, setIsEqual] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [graphData, setGraphData] = useState<
    {
      name: string;
      skill: number;
      pv: number;
    }[]
  >([]);

  const [tags, setTags] = useState("Gerais");

  const getData = async () => {
    try {
      if (emailIntern) {
        const { data } = await api.get("/chart/" + emailIntern, {
          params: tags !== "Gerais" ? { tags } : null,
        });
        setGraphData(data);
      }
    } catch (error: any) {
      console.log({ error: error.message });
    }
  };

  useEffect(() => {
    getData();
  }, [tags, emailIntern]);

  const handleEmailIntern = (email: string) => {
    if (email === emailIntern) {
      setIsEqual(true);
    } else {
      getData();
      email && setEmailIntern(email);
      setIsEqual(false);
    }
  };

  const getIntern = async () => {
    const data = await getUserFromBackend(emailIntern);
    setIntern(data);
    if (data) {
      setName(data.name);
    }
  };

  useEffect(() => {
    if (!isEqual) getIntern();
  }, [isEqual, emailIntern]);

  useEffect(() => {
    getIntern();
  }, []);

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
        <div className={styles.intern_graph}>
          <TagChart tags={tags} setTags={setTags} graphData={graphData} />
        </div>
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
      <div className={styles.intern_comment}>
        <Comment student={emailIntern} />
      </div>
    </div>
  );
};

export default InternAnalisysScreen;
