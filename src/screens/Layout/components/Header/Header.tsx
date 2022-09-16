import { Link, useNavigate } from "react-router-dom";
import Images from "../../../../assets";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import { useAuth } from "../../../../context/AuthContext";
import styles from "./Header.module.css";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.header_container}>
      <div className={styles.header_inner}>
        <ButtonWithIcon
          icon={<img src={Images.icons.IconEdit} alt="Notas" />}
          position="left"
          text={user && user.role === "AMBASSADOR" ? "Notas privadas" : "Notas"}
          size="block"
          type="secondary"
          onClick={() => {
            navigate("/dashboard/notas");
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}

export default Header;
