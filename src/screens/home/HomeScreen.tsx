import { useAuth } from "../../context/AuthContext";
import HomeScreenEmabassador from "./HomeScreenEmabassador";
import HomeScreenStudent from "./HomeScreenStudent";

function HomeScreen() {
  const { user } = useAuth();
  if (!user) {
    return <> Carregando...</>;
  }

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div className={Styles.home_container}>
      <div className={Styles.left_content}>
        <AcademyProgress name={user.name} />
        <LastGoalsCard
          quantityGoals={10}
          mounth={months[new Date().getMonth()]}
          quantityGoalsCompleted={10}
        />
        <Register email={user.email} />
        <TrilhasComponent />
      </div>
      <div className={Styles.user_menu}>
        <div className={Styles.user_image}>
          <img className={Styles.avatar} src={user.avatarUrl} alt="img" />
        </div>
        <p className={Styles.user_name}>{user.name}</p>
        <p className={Styles.user_title}>{"Estagiário em Engenharia"}</p>
        <div className={Styles.user_status}>
          <div className={Styles.user_status_content}>
            <img
              src={Images.icons.level_Icon}
              className={Styles.level_Icon}
              alt="Level Icon"
            />

export default HomeScreen;
