import { useAuth } from "../../context/AuthContext";
import HomeScreenEmabassador from "./HomeScreenEmabassador";
import HomeScreenStudent from "./HomeScreenStudent";

function HomeScreen() {
  const { user } = useAuth();
  if (!user) {
    return <> Carregando...</>;
  }
  console.log({ user });
  if (user.role !== "STUDENT") {
    return <HomeScreenEmabassador user={user} />;
  } else return <HomeScreenStudent />;
}

export default HomeScreen;
