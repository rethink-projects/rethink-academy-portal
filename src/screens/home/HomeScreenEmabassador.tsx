import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Styles from "./HomeScreenEmabassador.module.css";
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
const HomeScreenEmabassador = ({ user }: any) => {
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
  }, []);

  useEffect(() => {
    setUsersFiltered(
      users.filter((user: userFromBackend) =>
        roleFilter.find((role) => role === user.main)
      )
    );
  }, [roleFilter]);

  const progressInfo = [
    {
      totalValue: 100,
      relativeValue: 50,
      title: "Boas vindas",
      desc: "Onboarding e Conhecimentos Gerais",
    },
    {
      totalValue: 100,
      relativeValue: 50,
      title: "Nivelamento Técnico",
      desc: "Conhecimentos sobre o Ciclo do Produto e Metodologias Ágeis",
    },
    {
      totalValue: 100,
      relativeValue: 50,
      title: "Projeto Prático",
      desc: "Colocar em ação todo o conhecimento aprendido em um projeto real",
    },
  ];

  const navigate = useNavigate();

  return (
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
                  <button className={Styles.card_role}>Engenharia</button>
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
  );
};

export default HomeScreenEmabassador;
