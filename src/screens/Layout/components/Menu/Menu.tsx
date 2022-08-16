import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../../../assets";
import Avatar from "../../../../components/Avatar/Avatar";
import { useAuth } from "../../../../context/AuthContext";
import { useNotification } from "../../../../context/NotificationContext";
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
      <div className={styles.menu_body}>
        <MenuItem isOpen={isOpen} text="Home" icon={Images.icons.IconHome} />
        <MenuItem
          isOpen={isOpen}
          text="Seu Desenvolvimento"
          icon={Images.icons.DevelopmentIcon}
        />
        <MenuItem isOpen={isOpen} text="Cursos" icon={Images.icons.ratIcon} />
        <MenuItem
          isOpen={isOpen}
          text="Registro de Horas"
          icon={Images.icons.ClockHome}
        />
        <MenuItem
          isOpen={isOpen}
          text="Contrato"
          icon={Images.icons.ContractIcon}
        />
      </div>
    </div>
  );
}

export default Menu;
