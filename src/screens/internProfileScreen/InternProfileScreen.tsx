import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// styles
import styles from "./InternProfileScreen.module.css";

// types
import { GetUserType } from "../PersonalDevelopmentScreen/components/sideModal/SideModal";

// components
import Spinner from "../../components/Spinner/Spinner";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StudentInfoCard from "../../components/StudentInfoCard/StudentInfoCard";
import Register from "../../components/Register/Register";
import LastGoalsCard from "../../components/LastGoalsCard/LastGoalsCard";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PersonalDevelopmentChart from "../../components/SkillChart/PersonalDevelopmentChart";
import NotesCard from "../PersonalDevelopmentScreen/components/NotesCard/NotesCard";

const InternProfileScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [studentUser, setStudentUser] = useState<GetUserType>();

  const URL = window.location.pathname.split("/");
  const studentEmail = URL[3];
  console.log(studentEmail);

  const getStudentUser = async () => {
    try {
      if (studentEmail) {
        const userData = await axios.get(
          `http://localhost:4000/api/user/${studentEmail}`
        );
        setStudentUser(userData.data);
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentUser();
  }, [studentEmail]);

  if (user) {
    if (user.role === "AMBASSADOR") {
      return (
        <div className={styles.userAmbassador_container}>
          {studentUser && (
            <Breadcrumb
              breadcrumbItems={[
                { title: "Home", link: "/" },
                {
                  title: `${studentUser.name} ${studentUser.surname}`,
                  link: `/dashboard/perfilDoEstagiario/${studentEmail}`,
                },
              ]}
            />
          )}
          <div className={styles.userAmbassador_cards}>
            <div className={styles.userAmbassador_cards_firstLine}>
              <StudentInfoCard studentEmail={studentEmail} />
              <div className={styles.cardContrato}>Contrato</div>
              <Register type={"ambassador"} />
              <LastGoalsCard studentEmail={studentEmail} />
            </div>
            <div className={styles.userAmbassador_cards_lastLine}>
              <div className={styles.userAmbassador_cards_skills}>
                <div className={styles.userAmbassador_cards_info}>
                  <p>Evolução de Habilidades</p>
                  <div
                    className={styles.userAmbassador_cards_action}
                    onClick={() => navigate(`/`)}
                  >
                    <span>Ver mais</span>
                    <ArrowForwardRoundedIcon />
                  </div>
                </div>
                <PersonalDevelopmentChart email={studentEmail} />
              </div>
              <div className={styles.userAmbassador_cards_notes}>
                <div className={styles.userAmbassador_cards_info}>
                  <p>Suas anotações</p>
                  <div
                    className={styles.userAmbassador_cards_action}
                    onClick={() => navigate(`/dashboard/notas/${studentEmail}`)}
                  >
                    <span>Ver mais</span>
                    <ArrowForwardRoundedIcon />
                  </div>
                </div>
                <NotesCard studentEmail={studentEmail} height={"415px"} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.userStudent_container}>
          <h1>Não tem permissão para acessar esta página</h1>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.userStudent_container}>
        <Spinner type="light" size="big" isLoading={true} />
      </div>
    );
  }
};

export default InternProfileScreen;
