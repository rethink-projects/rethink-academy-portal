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
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

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
    console.log({ emailIntern });
    getData();
  }, [tags, emailIntern]);

  // const handleEmailIntern = (email: string) => {
  //   if (email) {
  //     navigate("/dashboard/register/analysis/" + email);
  //     getData();
  //     setIsEqual(true);
  //   } else {
  //     setEmailIntern(email);
  //     setIsEqual(false);
  //   }
  //   console.log(emailIntern);
  // };

  const handleEmailIntern = (email: string) => {
    console.log("email", email);
    if (email === emailIntern) {
      setIsEqual(true);
    } else {
      getData();
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
        <Comment />
      </div>
    </div>
  );
};

export default InternAnalisysScreen;
