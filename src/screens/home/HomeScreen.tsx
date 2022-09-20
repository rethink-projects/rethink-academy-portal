import { useAuth } from "../../context/AuthContext";
import HomeScreenAmbassador from "./HomeScreenAmbassador";
import HomeScreenStudent from "./HomeScreenStudent";

function HomeScreen() {
  const { user } = useAuth();
  if (!user) {
    return <> Carregando...</>;
  }
  if (user.role === "STUDENT") {
    return <HomeScreenStudent />;
  }
  return <HomeScreenAmbassador user={user} />;
}

export default HomeScreen;
