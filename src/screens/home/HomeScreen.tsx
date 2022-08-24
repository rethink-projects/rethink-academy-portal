import { useAuth } from "../../context/AuthContext";
import TrilhasComponent from "./components/trilhas/TrilhasComponent";
import styles from "./Home.module.css";

function HomeScreen() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.home_container}>
      <h4>Olá {user.email}</h4>
      <p>Bem-vindo, essa é a tela Principal</p>
    </div>
  );
}

export default HomeScreen;
