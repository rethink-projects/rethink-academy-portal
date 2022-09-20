import styles from "./TrilhasScreen.module.css";
import CardTrilhas from "./components/CardTrilhas/CardTrilhas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ModalEditCardTrilhas } from "./components/ModalEditCardTrilhas/ModalEditCardTrilhas";
import { useAuth } from "../../context/AuthContext";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { api } from "../../services/backend/Api";

type TypeTrails = {
  name: string;
  id: string;
  description: string;
  weight: number;
  imageUrl: string;
};
const TrilhasScreen = () => {
  let userEmail = "";
  const { user: userAuth } = useAuth();

  if (userAuth) userEmail = userAuth.email;

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trails, setTrails] = useState<TypeTrails[]>();
  const [user, setUser] = useState<any>();
  const [valueNameTrail, setValueNameTrail] = useState("");
  const [valueImageTrail, setValueImageTrail] = useState("");
  const [valueDescriptionTrail, setValueDescriptionTrail] = useState("");

  const [trailUpdated, setTrailUpdated] = useState<TypeTrails>();

  useEffect(() => {
    api.get("/user/" + userAuth?.email).then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
      }
    });
    api.get("/trail").then((response) => {
      if (response.data.trail) {
        setTrails(response.data.trail);
      }
    });
  }, [modalIsOpen, userEmail]);

  const setStateModalOnclick = (trailId: string) => {
    const searchTrailUpdated = trails?.find((trail) => trail.id === trailId);
    if (searchTrailUpdated) {
      setTrailUpdated(searchTrailUpdated);
      setValueNameTrail(searchTrailUpdated.name);
      setValueDescriptionTrail(searchTrailUpdated.description);
    }

    setModalIsOpen(true);
  };

  const handleClickCardTrails = (event: any, item: TypeTrails) => {
    if (event.target.id !== "edit_action") {
      navigate("" + item.id);
    }
  };

  const onChangeNameTrail = (event: any) => {
    setValueNameTrail(event.target.value);
  };

  const onChangeDescriptionTrail = (event: any) => {
    setValueDescriptionTrail(event.target.value);
  };

  const handleConfirm = async () => {
    setValueDescriptionTrail("");
    setValueNameTrail("");
    setValueImageTrail("");

    const update = await api.put("/trail/" + trailUpdated?.id, {
      name: valueNameTrail,
      description: valueDescriptionTrail,
    });

    setModalIsOpen(false);
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <>
          <Breadcrumb
            breadcrumbItems={[
              { title: "Home", link: "/dashboard" },
              { title: "Cursos", link: "#" },
            ]}
          />
          <div className={styles.text_container}>
            <div className={styles.title}>Cursos</div>
            <div className={styles.description}>
              Cada área possui uma trilha de ensino, com cursos desenvolvidos ou
              selecionados pela Rethink. Primeiramente, você terá acesso ao
              conteúdo da sua área, mas poderá desbloquear o acesso das outras
              ao assistir cursos que são pré-requisitos. Bons estudos!
            </div>
          </div>
          {/* <div style={{ width: "100%" }}></div> */}
          {trails?.map((item, index) => (
            <CardTrilhas
              key={item.id}
              user={userAuth?.role === "AMBASSADOR" ? "teacher" : "student"}
              onClick={(event: any) => handleClickCardTrails(event, item)}
              trail={item}
              setModal={() => setStateModalOnclick(item.id)}
              image={item.imageUrl}
              previous={
                index > 0
                  ? index === 1
                    ? trails[trails.length - 1].name
                    : trails[index - 1].name
                  : trails[index].name
              }
            ></CardTrilhas>
          ))}
        </>
      </div>
      {modalIsOpen && (
        <ModalEditCardTrilhas
          handleConfirm={handleConfirm}
          onChangeNameTrail={onChangeNameTrail}
          onChangeDescriptionTrail={onChangeDescriptionTrail}
          onChangeImageTrail={onChangeDescriptionTrail}
          valueNameTrail={valueNameTrail}
          valueDescriptionTrail={valueDescriptionTrail}
          valueImageTrail={valueImageTrail}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TrilhasScreen;
