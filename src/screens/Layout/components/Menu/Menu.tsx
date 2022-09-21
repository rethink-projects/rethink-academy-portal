import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../../../assets";
import Avatar from "../../../../components/Avatar/Avatar";
import { useAuth } from "../../../../context/AuthContext";
import { useNotification } from "../../../../context/NotificationContext";
import { titleMaker } from "../../../../helpers/titleMaker";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./Menu.module.css";

function Menu() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const currentClass = isOpen
    ? styles.menu_container_open
    : styles.menu_container_closed;

  const handleLogout = () => {
    signout(() => {
      notify({
        title: "Você foi deslogado",
        description: "Você foi deslogado com sucesso",
        type: "success",
      });
      navigate("/");
    });
  };
  if (!user?.email) {
    return <p>Loading...</p>;
  }

  return (
    <div className={currentClass}>
      <div className={styles.menu_header_open}>
        <img
          onClick={handleClick}
          className={
            isOpen
              ? styles.menu_header_img_toggle
              : styles.menu_header_img_toggle_closed
          }
          src={Images.icons.IconToggle}
          alt="Icon Toggle Menu"
        />
        <img
          className={styles.menu_header_img}
          src={Images.logoRaSecondary}
          alt="RatRa"
        />
      </div>
      <div className={isOpen ? styles.menu_body_open : styles.menu_body_closed}>
        <div
          className={isOpen ? styles.menu_inner_open : styles.menu_inner_closed}
        >
          <Link to={"/dashboard"}>
            <MenuItem
              isOpen={isOpen}
              text="Home"
              icon={Images.icons.IconHome}
            />
          </Link>

          {user.role === "AMBASSADOR" ? (
            <>
              <Link to={"/dashboard/notas"}>
                <MenuItem
                  isOpen={isOpen}
                  text="Notas Privadas"
                  icon={Images.icons.privateNotes}
                />
              </Link>
              <Link to={"/dashboard/avaliacao"}>
                <MenuItem
                  isOpen={isOpen}
                  text="Avaliações"
                  icon={Images.icons.avaliations}
                />
              </Link>
            </>
          ) : (
            <>
              <Link to={"/dashboard/desenvolvimentoPessoal"}>
                <MenuItem
                  isOpen={isOpen}
                  text="Seu Desenvolvimento"
                  icon={Images.icons.DevelopmentIcon}
                />
              </Link>
              <Link to={"/dashboard/registroDeHoras"}>
                <MenuItem
                  isOpen={isOpen}
                  text="Registro de Horas"
                  icon={Images.icons.ClockHome}
                />
              </Link>
              <Link to={"/dashboard/registroDeHoras/analise"}>
                <MenuItem
                  text="Análise de Desempenho"
                  isOpen={isOpen}
                  icon={Images.icons.chart}
                />
              </Link>
              <Link to={"/dashboard/contrato"}>
                <MenuItem
                  text="Contrato"
                  isOpen={isOpen}
                  icon={Images.icons.ContractIcon}
                />
              </Link>
            </>
          )}
          <Link to={"/dashboard/trilhas"}>
            <MenuItem
              isOpen={isOpen}
              text="Cursos"
              onClick={() => navigate("trilhas")}
              icon={Images.icons.ratIcon}
            />
          </Link>
        </div>

        <div
          className={
            isOpen ? styles.fotter_menu_open : styles.fotter_menu_closed
          }
        >
          <MenuItem
            isOpen={isOpen}
            text="Sair"
            onClick={handleLogout}
            icon={Images.icons.LogoutIcon}
          />
          <div className={!isOpen ? styles.divider : styles.divider_closed} />
          <div className={styles.avatar}>
            <Avatar
              size="default"
              onClick={() => {}}
              type={user.email ? "image" : "text"}
            >
              <img
                referrerPolicy="no-referrer"
                className={styles.avatar_img}
                src={user.avatarUrl}
                alt="Avatar"
              />
            </Avatar>
            {isOpen && (
              <div className={styles.avatar_desc}>
                <span>{user.name}</span>
                <small>{titleMaker(user)}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
