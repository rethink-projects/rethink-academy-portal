import { useAuth } from "../../context/AuthContext";
import styles from "./Home.module.css";

function HomeScreen() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.home_container}>
      <h1>{user.email}</h1>
    </div>
  );
}

export default HomeScreen;
