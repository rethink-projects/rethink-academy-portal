import styles from "./TrilhasComponent.module.css";
import IconMap from "@mui/icons-material/MapOutlined";
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { api } from "../../../../services/backend/Api";

type TrailType = {
  trail: { name: string; id: string; description: string };
};
type TypeLessonUser = {
  maxLessons: Array<TypeMaxLesson>;
  user: {
    id: string;
    email: string;
    surnmae: string;
    main: string;
    watched: string[];
    role: string;
  };
};
type TypeMaxLesson = {
  lessonsLength: number;
  userLessonsLength: number;
  completed: boolean;
  name: string;
  id: string;
  trail: {
    id: string;
    name: string;
    description: string;
  };
};

//Componente a ser usado na HOME
const TrilhasComponent = () => {
  const { user } = useAuth();

  const [trails, setTrails] = useState<TrailType[]>();
  const [lessonUser, setLessonUser] = useState<TypeLessonUser>();

  useEffect(() => {
    api.get("/trail").then((response) => {
      if (response.data.trail) {
        setTrails(response.data.trail);
      }
    });
    api.get("/user/watched/" + user.email).then((response) => {
      setLessonUser(response.data);
    });
  }, []);

  return (
    <div className={styles.trilhas_container}>
      <div className={styles.trilhas_title_container}>
        <div className={styles.icon_container}>
          <IconMap />
        </div>
        <span>Trilhas</span>
      </div>
      <div className={styles.cards_container}>
        {trails?.map((trail: any) => (
          <CardTrilhasHome
            key={trail.id}
            trail={trail}
            lessonUser={lessonUser!}
          />
        ))}
      </div>
    </div>
  );
};

export default TrilhasComponent;
