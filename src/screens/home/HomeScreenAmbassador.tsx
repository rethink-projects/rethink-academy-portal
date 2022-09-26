import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Styles from "./HomeScreenAmbassador.module.css";
import Images from "../../assets";
import { useNotification } from "../../context/NotificationContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { getAllStudents } from "../../services/backend/UserService";
import { useNavigate } from "react-router-dom";
type userFromBackend = {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  main: string;
  avatar: string;
};
const HomeScreenAmbassador = ({ user }: any) => {
  const { notify } = useNotification();
  const [end, setEnd] = useState(false);
  const [users, setUsers] = useState<userFromBackend[]>([]);
  const [usersFilterd, setUsersFiltered] = useState<userFromBackend[]>([]);

  const [academyClass, setAcademyClass] = useState("1/2022");
  const [roleFilter, setRoleFilter] = useState<string[]>(["ENGINEERING"]);

  const roleClass = (role: string) => {
    const isSelected = roleFilter.find((title) => title === role);
    if (isSelected) {
      return `${Styles.role_selector_button} ${Styles.role_selector_button_active}`;
    }
    return Styles.role_selector_button;
  };

  const handlerOnClickRoleSelector = (role: string) => {
    const isSelected = roleFilter.findIndex((title) => title === role);
    if (isSelected === 0 && roleFilter.length === 1) {
      notify({
        title: "Você precisa de pelo menos um filtro",
        type: "error",
      });
      return;
    }
    if (isSelected >= 0) {
      setRoleFilter((prevValue) => prevValue.filter((title) => title !== role));
      return;
    } else {
      setRoleFilter((prevValue) => [...prevValue, role]);
      return;
    }
  };
  const getStudentMain = (main: string) => {
    switch (main) {
      case "ENGINEERING":
        return "Engenharia";
      case "DESIGN":
        return "Design";
      case "PRODUCT":
        return "Produto";
    }
  };

  const getAllUsersWithRoleStudent = async () => {
    const data = await getAllStudents();
    setUsers(data);
    setUsersFiltered(
      data.filter((user: userFromBackend) =>
        roleFilter.find((role) => role === user.main)
      )
    );
  };

  useEffect(() => {
    getAllUsersWithRoleStudent();
    if (new Date().getTime() > new Date(2022, 8, 22).getTime()) {
      setEnd(true);
    }
  }, []);

  useEffect(() => {
    setUsersFiltered(
      users.filter((user: userFromBackend) =>
        roleFilter.find((role) => role === user.main)
      )
    );
  }, [roleFilter]);

  const getDateRange = (initialDate: Date, finalDate: Date) => {
    const date: Date = new Date(initialDate.getTime());
    let stages: {
      finalDate: number;
      dates: number[];
    }[] = [
      {
        finalDate: new Date(2022, 2, 25).getTime(),
        dates: [],
      },
      {
        finalDate: new Date(2022, 3, 29).getTime(),
        dates: [],
      },
      {
        finalDate: new Date(2022, 8, 21).getTime(),
        dates: [],
      },
    ];

    let stageHelper = 0;
    while (date <= finalDate) {
      if (date.getTime() >= stages[stageHelper].finalDate) {
        if (stageHelper < stages.length - 1) {
          stageHelper++;
        }
      }
      stages[stageHelper].dates.push(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    return stages;
  };
  const dateRanges = getDateRange(new Date(2022, 2, 7), new Date(2022, 8, 22));
  const progressInfo = [
    {
      totalValue: dateRanges[0].dates.length,
      relativeValue: dateRanges[0].dates.filter(
        (date) => date <= new Date().getTime()
      ).length,
      title: "Boas vindas",
      desc: "Onboarding e Conhecimentos Gerais",
    },
    {
      totalValue: dateRanges[1].dates.length,
      relativeValue: dateRanges[1].dates.filter(
        (date) => date <= new Date().getTime()
      ).length,
      title: "Nivelamento Técnico",
      desc: "Conhecimentos sobre o Ciclo do Produto e Metodologias Ágeis",
    },
    {
      totalValue: dateRanges[2].dates.length,
      relativeValue: dateRanges[2].dates.filter(
        (date) => date <= new Date().getTime()
      ).length,
      title: "Projeto Prático",
      desc: "Colocar em ação todo o conhecimento aprendido em um projeto real",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className={Styles.max_container}>
      <div className={Styles.home_limited_container}>
        <div className={Styles.home_container}>
          <p className={Styles.home_hello}>E ai, {user.name} 🥳</p>
          <div className={Styles.home_header}>
            <div>
              <p className={Styles.title}>Estagiários</p>
              <p className={Styles.tip}>
                Selecione uma turma para acompanhar a evolução
              </p>
            </div>
            <Dropdown
              setValue={setAcademyClass}
              value={academyClass}
              options={["1/2022"]}
              id={"Team"}
              width={185}
            />
          </div>

          <div className={Styles.home_content}>
            <div className={Styles.home_content_header}>
              <p>
                Selecione um estagiário para ter acesso aos seus dados de
                desenvolvimento:
              </p>
              <div className={Styles.role_selector}>
                <button
                  onClick={() => handlerOnClickRoleSelector("DESIGN")}
                  className={roleClass("DESIGN")}
                >
                  Design
                </button>
                <button
                  onClick={() => handlerOnClickRoleSelector("ENGINEERING")}
                  className={roleClass("ENGINEERING")}
                >
                  Engenharia
                </button>
                <button
                  onClick={() => handlerOnClickRoleSelector("PRODUCT")}
                  className={roleClass("PRODUCT")}
                >
                  Produto
                </button>
              </div>
            </div>
            <div className={Styles.cards_container}>
              {usersFilterd.map((intern, index) => (
                <div
                  className={Styles.student_card}
                  key={index}
                  onClick={() =>
                    navigate(`/dashboard/perfilDoEstagiario/${intern.email}`)
                  }
                >
                  <div className={Styles.student_card_arrow} />
                  <div className={Styles.student_card_avatar}>
                    <img
                      src={intern.avatar}
                      className={Styles.avatar_img}
                      alt="Student Avatar Arrow"
                    />
                    <div className={Styles.avatar_level}>
                      <img
                        src={Images.icons.level_Icon}
                        className={Styles.avatar_icon}
                        alt="Rethink Arrow"
                      />
                      {user.level}
                    </div>
                  </div>
                  <div className={Styles.student_card_text}>
                    <div>{intern.name + " " + intern.surname}</div>
                    <button className={Styles.card_role}>
                      {getStudentMain(intern.main)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={Styles.progress_container}>
            <p className={Styles.title}>Progresso da Turma</p>
            <p className={Styles.tip}>
              Confira em que ponto da jornada essa turma está!
            </p>
          </div>
          <div className={Styles.progress_content}>
            {progressInfo.map(
              ({ totalValue, relativeValue, desc, title }, index) => (
                <div className={Styles.progress_item} key={index}>
                  <ProgressBar
                    color="dark"
                    size="large"
                    width={326}
                    totalValue={totalValue}
                    relativeValue={relativeValue}
                  />
                  <div className={Styles.progress_description}>
                    <img
                      src={Images.Emblem}
                      alt=""
                      style={{ width: "32px", height: "32px" }}
                    />
                    <div>
                      <h1>{title}</h1>
                      <p>{desc}</p>
                    </div>
                  </div>
                </div>
              )
            )}
            <div className={Styles.progress_status}>
              <img src={Images.ProgressBack} alt="Background" />
              <img
                src={end ? Images.ProgressEndIcon : Images.ProgressIcon}
                alt="Background"
                className={Styles.ProgressIcon}
              />
              <div className={Styles.status_description}>
                <p className={Styles.title}></p>
                {end ? "Academy Concluído!" : "Academy em Progresso!"}
                <p className={Styles.tip}>Programa de Estágio 2022</p>
              </div>
              <div className={Styles.progress_emoji}>💚 {end ? "🎉" : ""}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenAmbassador;
